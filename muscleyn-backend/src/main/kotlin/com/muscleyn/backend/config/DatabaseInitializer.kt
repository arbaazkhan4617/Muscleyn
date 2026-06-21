package com.muscleyn.backend.config

import com.muscleyn.backend.entity.Cms
import com.muscleyn.backend.repository.CmsRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DatabaseInitializer(
    private val cmsRepository: CmsRepository
) : CommandLineRunner {

    override fun run(vararg args: String) {
        seedCmsKey("goals-list", """[
          { "title": "Muscle Gain", "copy": "Heavy calorie stacks for lean bulking", "img": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
          { "title": "Fat Loss", "copy": "Clean energy and cutting support", "img": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800&auto=format&fit=crop" },
          { "title": "Recovery", "copy": "Protein and sleep-friendly nutrition", "img": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" }
        ]""")

        seedCmsKey("blogs-list", """[
          {
            "id": 1,
            "tag": "Nutrition & Foods",
            "tagSub": "Featured Article",
            "date": "November 28, 2024",
            "author": "Dr. Manish Kumar, R.D.",
            "readTime": "5 min read",
            "title": "Top Foods for High-Protein Meals",
            "summary": "Protein is described as the building block of a diet which makes it an essential element in a well-balanced diet. Discover the ultimate protein sources to fuel muscle hypertrophy and daily recovery.",
            "content": "When it comes to building muscle, protein is the single most critical macronutrient. However, not all proteins are created equal. Biological value (BV) and amino acid profile dictate how effectively your body utilizes protein. To maximize hypertrophy, athletes should prioritize whole food sources rich in leucine and essential amino acids (EAAs).\n\nTop sources include chicken breast, egg whites, lean beef, wild-caught salmon, and Greek yogurt. Plant-based lifters can rely on organic tofu, tempeh, lentils, and premium pea-rice isolate blends. Incorporating these foods consistently into your meals provides a sustained release of amino acids, maintaining an anabolic state throughout the day.",
            "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
            "link": "/blogs"
          },
          {
            "id": 2,
            "tag": "Whey Science",
            "tagSub": "Research Spotlight",
            "date": "November 27, 2024",
            "author": "Prabha Research Lab",
            "readTime": "7 min read",
            "title": "Whey Protein Isolate: Benefits, Usage, and Myths Debunked",
            "summary": "Whey Protein Isolate (WPI) has a higher protein concentration, usually over 90%. Learn the production science and how to maximize muscle protein synthesis.",
            "content": "Whey Protein Isolate undergoes cross-flow microfiltration to strip out almost all fats, cholesterol, and lactose. What remains is a pure, rapidly absorbing protein source containing over 90% protein by weight. This makes WPI ideal for post-workout consumption, as it triggers a fast insulin response to kickstart recovery.\n\nA common myth is that isolate is only for cutting phases. In reality, isolate is beneficial for any phase because it digests easily and does not cause gastrointestinal distress, unlike low-grade concentrates. Consuming WPI within 30-45 minutes post-training guarantees optimal delivery of amino acids to damaged muscle fibers.",
            "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
            "link": "/blogs"
          },
          {
            "id": 3,
            "tag": "Fitness Myths",
            "tagSub": "Myths Vs Realities",
            "date": "November 19, 2024",
            "author": "Coach Kartik",
            "readTime": "6 min read",
            "title": "7 Common Whey Protein Myths Vs Realities",
            "summary": "Protein is one of the essential macronutrients needed for overall health. We break down the top 7 myths surrounding whey consumption and clarify real scientific guidelines.",
            "content": "Myth 1: Whey protein damages kidneys. Reality: In healthy individuals, high protein intake does not harm renal function.\nMyth 2: Whey makes women bulky. Reality: Bulking requires a significant caloric surplus and high testosterone levels. Whey simply supports recovery.\nMyth 3: Whey is loaded with steroids. Reality: Genuine supplements, like Prabha Pharma's Muscleyn, undergo rigid third-party testing and contain no illegal contaminants.\nMyth 4: You must consume whey immediately post-workout or lose gains. Reality: The anabolic window is wider than once thought, though post-workout protein is still optimal.\nMyth 5: Cooking whey destroys its protein quality. Reality: Heat denatures the shape of the proteins but does not affect the amino acid absorption.\nMyth 6: Whey causes severe acne. Reality: While dairy can impact skin in sensitive individuals, pure isolate has negligible lactose and fats.\nMyth 7: Supplements are only for bodybuilders. Reality: Anyone looking to meet daily protein goals can safely use clean whey supplements.",
            "image": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop",
            "link": "/blogs"
          }
        ]""")

        seedCmsKey("news-list", """[
          {
            "id": 1,
            "publisher": "ET Industry Changemakers (North 2026)",
            "date": "June 15, 2026",
            "headline": "Prabha Pharma Honored with the Northern Region Industry Changemaker Award 2026",
            "summary": "Recognized for disruptive clean formulations and supply chain integrity in the sports nutrition sector.",
            "detail": "Prabha Pharma has been awarded the prestigious 'ET Industry Changemakers Award 2026' for the Northern Region. The award committee cited our commitment to absolute ingredient transparency, third-party batch testing, and removing proprietary blends from fitness supplements as key factors. By creating clean, high-efficacy options under the Muscleyn line, Prabha Pharma is raising the bar for the entire Indian supplements industry.",
            "icon": "Award"
          },
          {
            "id": 2,
            "publisher": "ET Brand Equity",
            "date": "May 22, 2026",
            "headline": "Marketing Authenticity: How Prabha Pharma Replaced Gym-Bro Noise with Clinical Standards",
            "summary": "A deep dive into how transparency and batch certificates became our primary marketing campaign.",
            "detail": "In an industry historically driven by aggressive and misleading claims, Prabha Pharma's 'Authenticity First' approach is carving a new path. Brand Equity analyzes how launching public-access lab certificates and Labdoor certifications built a strong foundation of trust among gen-z and millennial athletes, leading to a 40% year-on-year growth.",
            "icon": "TrendingUp"
          },
          {
            "id": 3,
            "publisher": "afaqs!",
            "date": "April 18, 2026",
            "headline": "Prabha Pharma Launches #GenuinePerformers Campaign for Muscleyn Series",
            "summary": "The marketing push includes QR code verifications and partnerships with elite IFBB coaches.",
            "detail": "Afaqs reports on Prabha Pharma's new marketing roadmap for the Muscleyn product stack. The campaign highlights double-blind lab testing and unique QR scanning on each bottle to verify authentic packaging and content. With fitness influencers like Aarush Bhola on board, the campaign is setting records for direct-to-consumer engagement.",
            "icon": "Newspaper"
          },
          {
            "id": 4,
            "publisher": "THE WEEK",
            "date": "March 10, 2026",
            "headline": "Supplements Audit: How Sourcing Dictates Fitness Progress",
            "summary": "The Week investigates how Prabha Pharma isolates components to maintain pharmaceutical grade quality.",
            "detail": "Sourcing ingredients of raw whey, creatine, and amino acids is notorious for quality fluctuation. The Week's investigative team audits Prabha Pharma's sourcing nodes in Germany and Ireland, confirming that their pharmaceutical standards avoid bulk fillers and heavy metals, resulting in a cleaner product stack.",
            "icon": "Newspaper"
          },
          {
            "id": 5,
            "publisher": "GQ",
            "date": "February 24, 2026",
            "headline": "The Elite Fitness Stack: Why Athletes are Swapping to Prabha Pharma's Formulas",
            "summary": "GQ editors test the premium isolates and pre-workout stacks designed for high performance.",
            "detail": "Our GQ editors tested the Muscleyn Elite Whey Isolate and Pre-Workout stack for 6 weeks. The results are clear: the clean mixability and caffeine-tea-extract ratio deliver high performance outputs without the digestive discomfort or energy crashes typical of competitor formulas.",
            "icon": "Star"
          }
        ]""")

        seedCmsKey("blogs-page-header", """{
          "title": "Our Blogs",
          "subtitle": "Science-backed articles, sports nutrition reports, and training insights curated by our medical and coaching panels."
        }""")

        seedCmsKey("news-page-header", """{
          "title": "Our News",
          "subtitle": "Media features, corporate announcements, and press coverage of our award-winning clean sports nutrition initiatives."
        }""")

        seedCmsKey("return-refund-policy", "Default Return and Refund Policy: Prabha Pharma is dedicated to customer satisfaction. Unopened products in their original packaging can be returned within 14 days of delivery. Please contact support for assistance.")

        seedCmsKey("trust-ticker-list", """["50K+ Customers", "10K+ Orders Delivered", "500+ Products", "Trusted By Athletes"]""")

        seedCmsKey("contact-header", """{
          "eyebrow": "Contact Us",
          "title": "Need help with products, orders, or your stack?",
          "description": "Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.",
          "bgImage": "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop"
        }""")

        seedCmsKey("contact-info-cards", """[
          { "icon": "Phone", "title": "Phone", "value": "+91 98765 43210" },
          { "icon": "Mail", "title": "Email", "value": "support@muscleyn.com" },
          { "icon": "MapPin", "title": "Business", "value": "Fitness District, Indore, India" },
          { "icon": "Clock", "title": "Support Hours", "value": "Mon-Sat, 10:00 AM - 7:00 PM" }
        ]""")

        seedCmsKey("contact-support-cards", """[
          { "icon": "Headphones", "title": "Order Support", "copy": "Delivery, payment, returns" },
          { "icon": "MessageCircle", "title": "Stack Guidance", "copy": "Goal-based supplement advice" },
          { "icon": "Send", "title": "Social", "copy": "Follow drops and athlete stories" }
        ]""")

        seedCmsKey("contact-stores", """[
          {
            "id": "indore",
            "name": "Muscleyn Indore HQ",
            "address": "Vijay Nagar, Indore, Madhya Pradesh 452010",
            "timings": "Mon-Sat, 10 AM - 7 PM",
            "mapUrl": "https://www.google.com/maps?q=22.7533,75.8937&z=16&output=embed",
            "directionsUrl": "https://www.google.com/maps?q=22.7533,75.8937"
          },
          {
            "id": "mumbai",
            "name": "Muscleyn Mumbai Experience Center",
            "address": "Bandra West, Link Road, Mumbai, Maharashtra 400050",
            "timings": "Mon-Sun, 11 AM - 8 PM",
            "mapUrl": "https://www.google.com/maps?q=19.0600,72.8311&z=16&output=embed",
            "directionsUrl": "https://www.google.com/maps?q=19.0600,72.8311"
          },
          {
            "id": "delhi",
            "name": "Muscleyn Delhi Experience Center",
            "address": "Connaught Place, Radial Road 1, New Delhi 110001",
            "timings": "Mon-Sun, 10 AM - 9 PM",
            "mapUrl": "https://www.google.com/maps?q=28.6304,77.2177&z=16&output=embed",
            "directionsUrl": "https://www.google.com/maps?q=28.6304,77.2177"
          },
          {
            "id": "bengaluru",
            "name": "Muscleyn Bengaluru Experience Center",
            "address": "Indiranagar, 100 Feet Rd, Bengaluru, Karnataka 560038",
            "timings": "Mon-Sat, 10 AM - 8 PM",
            "mapUrl": "https://www.google.com/maps?q=12.9719,77.6412&z=16&output=embed",
            "directionsUrl": "https://www.google.com/maps?q=12.9719,77.6412"
          }
        ]""")

        seedCmsKey("contact-faqs", """[
          {
            "question": "How fast do you ship orders?",
            "answer": "Most orders are prepared within 24 hours. Final delivery depends on the destination and courier coverage."
          },
          {
            "question": "Can I get help choosing a supplement stack?",
            "answer": "Yes. Share your training goal, diet preference, and budget through the contact form and support can guide you."
          },
          {
            "question": "Do you support cash on delivery?",
            "answer": "COD can be enabled based on delivery location and order value. The checkout flow is structured for this support."
          }
        ]""")

        seedCmsKey("authenticity-hero", """{
          "tagline": "Authenticity & Testing",
          "subtitle": "Manufactured In",
          "title": "WORLD CLASS FACILITY",
          "bgImage": "",
          "badges": [
            { "code": "cGMP", "title": "cGMP Certified", "subtitle": "Current Practice", "color": "yellow" },
            { "code": "HACCP", "title": "HACCP Safety", "subtitle": "Food Safety Certified", "color": "blue" },
            { "code": "fssai", "title": "fssai approved", "subtitle": "Standard Compliance", "color": "green" },
            { "code": "KOSHER", "title": "Kosher Food", "subtitle": "Pure Ingredients", "color": "emerald" },
            { "code": "FSSC", "title": "FSSC 22000", "subtitle": "Sustained Quality", "color": "teal" },
            { "code": "100%", "title": "Third Party", "subtitle": "Independent Lab Tested", "color": "red" }
          ]
        }""")

        seedCmsKey("footer-config", """{
          "whyChoose": [
            { "value": "16 YEARS", "label": "Leading Sports Nutrition Brand", "style": "default" },
            { "value": "10M+", "label": "Happy Customers", "style": "red" },
            { "value": "100+", "label": "Genuine Products", "style": "default" },
            { "value": "100%", "label": "Genuine Products", "style": "default" },
            { "value": "FREE", "label": "Fast Shipping", "style": "grey" }
          ],
          "newsletter": {
            "title": "Newsletter",
            "description": "Subscribe to get early access to early access exclusive drops, new formulations, and members-only deals."
          },
          "socials": {
            "fb": "#",
            "ig": "#",
            "tw": "#",
            "yt": "#"
          }
        }""")

        seedCmsKey("authenticity-page-config", """{
          "hero": {
            "eyebrow": "Authenticity Guaranteed",
            "title": "Quality Meets Authenticity",
            "description": "Our guarantee stands strong. Every product sold on Prabha Pharma carries a Trust Seal — scan it to verify authenticity and access NABL-certified lab reports instantly.",
            "bgImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop"
          },
          "explainer": {
            "eyebrow": "What is a Trust Seal?",
            "title": "Trust Seal for Protein Authenticity & Report",
            "description": "The Trust Seal is used to authenticate and verify your product. Additionally, you can check the lab reports tested by NABL-accredited labs which showcase the protein content, heavy metal profile, amino acid profiles, and more.",
            "scratchCode": "BM-AAX5010",
            "scanText": "Scan for labs & use the scratch code for authentication",
            "points": [
              "NABL-accredited third-party lab testing",
              "Protein content verification",
              "Heavy metal profiling",
              "Amino acid profile analysis",
              "Holographic scratch-code anti-counterfeit"
            ]
          },
          "process": {
            "eyebrow": "Simple Process",
            "title": "Product Authentication Tips",
            "description": "Three easy steps to verify that what you're consuming is genuine, tested, and safe.",
            "steps": [
              {
                "step": "01",
                "title": "Scan the Trust Seal",
                "description": "Find the holographic Trust Seal sticker on your product packaging and scan the QR code using any smartphone camera.",
                "iconName": "ScanLine"
              },
              {
                "step": "02",
                "title": "You're on Our Website",
                "description": "The QR code lands you directly on our official Prabha Pharma verification portal — no third-party redirects.",
                "iconName": "ShieldCheck"
              },
              {
                "step": "03",
                "title": "View Lab Test Report",
                "description": "Access the full NABL-accredited third-party lab report showing protein content, heavy metal profile, and amino acid analysis.",
                "iconName": "FlaskConical"
              }
            ]
          },
          "certification": {
            "eyebrow": "Third-Party Certified",
            "title": "Every Batch. Every Test.",
            "description": "Our products are independently tested by NABL-accredited laboratories. The results are published and accessible to every customer through the Trust Seal QR code on the product.",
            "sampleReportTitle": "Lab Report — Sample Result",
            "sampleReportFooter": "Tested by SGS India Pvt. Ltd. | NABL Accredited | Certificate No. TC-7721",
            "sampleResults": [
              { "label": "Protein Percentage", "result": "Pass" },
              { "label": "Heavy Metal", "result": "Pass" },
              { "label": "Amino Acid Profile", "result": "Pass" },
              { "label": "Microbial Safety", "result": "Pass" }
            ],
            "badges": [
              { "label": "NABL Accredited", "sub": "Third-party lab tested", "iconName": "Award" },
              { "label": "100% Authentic", "sub": "Verified with Trust Seal", "iconName": "ShieldCheck" },
              { "label": "Protein Verified", "sub": "Clinically validated dosage", "iconName": "FlaskConical" },
              { "label": "Heavy Metal Safe", "sub": "Within permissible limits", "iconName": "CheckCircle2" }
            ]
          },
          "cta": {
            "title": "Shop with Complete Confidence",
            "description": "Every product on Prabha Pharma is backed by third-party lab testing and the Trust Seal guarantee. Your health deserves nothing less.",
            "btnPrimaryText": "Shop Now",
            "btnPrimaryLink": "/shop",
            "btnSecondaryText": "Contact Support",
            "btnSecondaryLink": "/contact"
          }
        }""")

        seedCmsKey("business-enquiry-config", """{
          "hero": {
            "eyebrow": "B2B Partnerships",
            "title": "Sell Muscleyn",
            "description": "Expand your business by partnering with India's premium, NABL-certified, and third-party tested fitness supplement brand. Become a distributor today."
          },
          "benefits": [
            { "iconName": "ShieldAlert", "title": "100% Genuine Catalog", "desc": "Every supplement is third-party tested with QR code authenticity tags and lab report lookups." },
            { "iconName": "Percent", "title": "Competitive Margins", "desc": "Access bulk wholesale pricing tiers that leave you with industry-leading profit margins." },
            { "iconName": "Truck", "title": "Priority Fulfillment", "desc": "B2B orders are processed and shipped via express courier nodes directly to your business address." },
            { "iconName": "TrendingUp", "title": "Marketing Assets", "desc": "Receive premium in-store branding, shaker bottles, gym posters, and official merchandise." }
          ],
          "contact": {
            "email": "partners@muscleyn.com",
            "phone": "+91 98765 43210"
          }
        }""")

        seedCmsKey("home-brand-film", """{
          "eyebrow": "The Standard",
          "title": "Built for lifters who respect the work",
          "description": "Watch our latest campaign featuring IFBB Pro athletes pushing their limits. We formulate products for those who demand more from themselves and their nutrition.",
          "imageUrl": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400&auto=format&fit=crop"
        }""")

        seedCmsKey("home-why-choose-us", """{
          "eyebrow": "Why Choose Us",
          "title": "Premium quality without the gym-bro noise",
          "description": "We believe in full transparency. No proprietary blends, no cheap fillers. Just clinically dosed, scientifically backed nutrition for real athletes.",
          "cards": [
            { "iconName": "ShieldCheck", "title": "Batch Tested", "copy": "Every batch is quality checked for consistency and purity by independent labs." },
            { "iconName": "Truck", "title": "Fast Fulfillment", "copy": "Optimized delivery flow and clear order updates. Next-day delivery on elite stacks." },
            { "iconName": "BadgeCheck", "title": "Authentic Formulas", "copy": "Transparent nutrition and premium sourcing. No proprietary blends or hidden fillers." },
            { "iconName": "Dumbbell", "title": "Athlete Focused", "copy": "Built around real training goals and routines, trusted by IFBB pros." }
          ]
        }""")
    }

    private fun seedCmsKey(key: String, value: String) {
        val existing = cmsRepository.findByCmsKey(key)
        if (existing == null) {
            val cms = Cms(
                cmsKey = key,
                cmsValue = value,
                createdAt = LocalDateTime.now(),
                updatedAt = LocalDateTime.now()
            )
            cmsRepository.save(cms)
            println("Seeded CMS key: $key")
        }
    }
}
