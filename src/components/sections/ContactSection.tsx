import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import ScrollReveal from '@/components/ui/ScrollReveal';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jyotiranjanpal777@gmail.com',
    href: 'mailto:jyotiranjanpal777@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Electronic City, Bengaluru, Karnataka',
    href: 'https://maps.app.goo.gl/s31cyX5LDdX7wx9M8',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9348495372',
    href: 'tel:+919348495372',
  },
];

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { toast } = useToast();

  const validateField = (field: keyof ContactFormData, value: string) => {
    try {
      contactSchema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate all fields
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: result.data.name,
          email: result.data.email,
          message: result.data.message,
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up" triggerOnce={false}>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-mono uppercase tracking-wider">
              {`> contact.connect()`}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Let's <span className="gradient-text glitch-hover" data-text="Connect">Connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm">
              {`// Have a project in mind? Let's talk.`}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <ScrollReveal variant="fade-right" delay={100} triggerOnce={false}>
            <div className="space-y-6">
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 hover:scale-105 transition-transform">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm">Currently available for freelance work</span>
              </div>

              <h3 className="text-2xl font-bold">
                Let's build something amazing together
              </h3>
              <p className="text-muted-foreground">
                I'm always excited to work on new projects and collaborate with 
                creative minds. Whether you have a specific project in mind or 
                just want to explore possibilities, feel free to reach out.
              </p>

              {/* Contact cards */}
              <div className="space-y-4 pt-4">
                {contactInfo.map((item, index) => (
                  <ScrollReveal key={item.label} variant="fade-up" delay={200 + index * 100} triggerOnce={false}>
                    <a
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-4 p-4 glass rounded-xl",
                        "transition-all duration-300",
                        "hover:-translate-x-1 hover:shadow-lg hover:border-accent/30 border border-transparent"
                      )}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-colors group-hover:rotate-6">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium group-hover:text-accent transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal variant="fade-left" delay={200} triggerOnce={false}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6 hover:shadow-xl transition-shadow duration-500">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={(e) => validateField('name', e.target.value)}
                  className={cn("bg-background/50", errors.name && "border-destructive")}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => validateField('email', e.target.value)}
                  className={cn("bg-background/50", errors.email && "border-destructive")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={(e) => validateField('message', e.target.value)}
                  className={cn("bg-background/50 resize-none", errors.message && "border-destructive")}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className={cn(
                "w-full relative overflow-hidden",
                "bg-gradient-to-r from-accent via-primary to-pink-500",
                "hover:opacity-90 text-primary-foreground",
                "transition-all duration-300"
              )}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
