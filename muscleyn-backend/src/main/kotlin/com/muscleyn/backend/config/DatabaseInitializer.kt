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

    override fun run(vararg args: String?) {
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
