import { Mail, MessageSquare, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
              <p className="text-xl text-muted-foreground md:text-2xl mt-6">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col justify-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center">Contact Information</h2>
                <p className="text-xl text-muted-foreground text-center">
                  Reach out to us through any of these channels, and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="grid gap-10 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                  <Mail className="h-10 w-10 text-primary" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Email</h3>
                    <p className="text-muted-foreground mt-2">support@gratitude-journal.com</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                  <Phone className="h-10 w-10 text-primary" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Phone</h3>
                    <p className="text-muted-foreground mt-2">+977 9808723883</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                  <MessageSquare className="h-10 w-10 text-primary" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Live Chat</h3>
                    <p className="text-muted-foreground mt-2">Available Monday-Friday</p>
                    <p className="text-muted-foreground">9am-5pm NST</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <h3 className="text-xl font-bold">Office Location</h3>
                <p className="text-muted-foreground">123 Gratitude Avenue, Suite 456</p>
                <p className="text-muted-foreground">Kathmandu, Koteshor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
