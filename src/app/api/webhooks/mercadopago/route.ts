import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // Get the webhook notification from Mercado Pago
    const body = await request.json()

    // Mercado Pago sends notifications with topic and id
    // For payments, topic is usually "payment"
    if (body.topic === 'payment') {
      const paymentId = body.id

      if (!paymentId) {
        return NextResponse.json(
          { error: 'Payment ID is required' },
          { status: 400 }
        )
      }

      // Configure Mercado Pago SDK
      const accessToken = process.env.MP_ACCESS_TOKEN
      if (!accessToken) {
        return NextResponse.json(
          { error: 'Mercado Pago access token not configured' },
          { status: 500 }
        )
      }

      const client = new MercadoPagoConfig({ accessToken: accessToken! })
      const payment = new Payment(client)

      // Get payment details from Mercado Pago
      const paymentResponse = await payment.get({ id: paymentId })

      // Check if payment is approved
      if (paymentResponse.status === 'approved') {
        // Find the order by external_reference
        const order = await prisma.order.findFirst({
          where: {
            externalReference: paymentResponse.external_reference
          }
        })

        if (order) {
          // Update order status to APPROVED
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: 'APPROVED'
            }
          })

          console.log(`Order ${order.id} marked as APPROVED`)
          return NextResponse.json({ received: true })
        } else {
          console.warn(`Order not found for external_reference: ${paymentResponse.external_reference}`)
          return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
          )
        }
      } else {
        // Payment is not approved (could be pending, rejected, etc.)
        console.log(`Payment ${paymentId} status: ${paymentResponse.status}`)

        // Optionally update order status based on payment status
        if (paymentResponse.external_reference) {
          const order = await prisma.order.findFirst({
            where: {
              externalReference: paymentResponse.external_reference
            }
          })

          if (order) {
            // Map Mercado Pago status to our order status
            let newStatus: string = order.status // Keep current status by default

            switch (paymentResponse.status) {
              case 'pending':
                newStatus = 'PENDING'
                break
              case 'in_process':
                newStatus = 'PENDING'
                break
              case 'in_mediation':
                newStatus = 'PENDING'
                break
              case 'rejected':
                newStatus = 'REJECTED'
                break
              case 'cancelled':
                newStatus = 'CANCELLED'
                break
              case 'refunded':
                newStatus = 'REFUNDED'
                break
              case 'charged_back':
                newStatus = 'CHARGEBACK'
                break
              default:
                newStatus = order.status
            }

            if (newStatus !== order.status) {
              await prisma.order.update({
                where: { id: order.id },
                data: { status: newStatus }
              })

              console.log(`Order ${order.id} status updated to ${newStatus}`)
            }
          }
        }

        return NextResponse.json({ received: true })
      }
    }

    // If it's not a payment notification, just acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}