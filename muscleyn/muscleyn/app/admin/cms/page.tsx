"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/services/api";
import toast from "react-hot-toast";
import { FileText, Save, ShieldCheck, Zap, Settings, Plus, Pencil, Trash2, Globe, Sparkles, Award, Phone, Mail, MapPin, Clock, Headphones, MessageCircle, Send, Image, Upload, ExternalLink, ToggleLeft, ToggleRight, XCircle, Briefcase } from "lucide-react";

function CMSPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "flash";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [loading, setLoading] = useState(true);
  const [savingTerms, setSavingTerms] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [savingReturnPolicy, setSavingReturnPolicy] = useState(false);
  const [savingFlash, setSavingFlash] = useState(false);
  const [savingGoals, setSavingGoals] = useState(false);
  const [savingBlogs, setSavingBlogs] = useState(false);
  const [savingNews, setSavingNews] = useState(false);

  // Terms & Conditions
  const [terms, setTerms] = useState("");

  // Privacy Policy
  const [privacy, setPrivacy] = useState("");

  // Return & Refund Policy
  const [returnPolicy, setReturnPolicy] = useState("");

  // Trust Ticker
  const [trustTickerList, setTrustTickerList] = useState<string[]>([]);
  const [savingTrustTicker, setSavingTrustTicker] = useState(false);
  const [newTickerItem, setNewTickerItem] = useState("");

  // Flash Sale Offer Banner
  const [flashActive, setFlashActive] = useState(true);
  const [flashTitle, setFlashTitle] = useState("Flash Sale Active");
  const [flashSubtitle, setFlashSubtitle] = useState("Up to 40% off on all whey proteins.");
  const [flashHours, setFlashHours] = useState(12);
  const [flashMinutes, setFlashMinutes] = useState(45);
  const [flashSeconds, setFlashSeconds] = useState(30);

  // Goals State
  const [goalsList, setGoalsList] = useState<any[]>([]);
  const [editingGoalIdx, setEditingGoalIdx] = useState<number | null>(null);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalCopy, setGoalCopy] = useState("");
  const [goalImg, setGoalImg] = useState("");
  const [uploadingGoalImage, setUploadingGoalImage] = useState(false);

  // Homepage Sections State
  const [brandFilmEyebrow, setBrandFilmEyebrow] = useState("The Standard");
  const [brandFilmTitle, setBrandFilmTitle] = useState("Built for lifters who respect the work");
  const [brandFilmDesc, setBrandFilmDesc] = useState("Watch our latest campaign featuring IFBB Pro athletes pushing their limits. We formulate products for those who demand more from themselves and their nutrition.");
  const [brandFilmImageUrl, setBrandFilmImageUrl] = useState("");
  const [uploadingBrandFilmImage, setUploadingBrandFilmImage] = useState(false);
  const [savingBrandFilm, setSavingBrandFilm] = useState(false);

  const [whyChooseUsEyebrow, setWhyChooseUsEyebrow] = useState("Why Choose Us");
  const [whyChooseUsTitle, setWhyChooseUsTitle] = useState("Premium quality without the gym-bro noise");
  const [whyChooseUsDesc, setWhyChooseUsDesc] = useState("We believe in full transparency. No proprietary blends, no cheap fillers. Just clinically dosed, scientifically backed nutrition for real athletes.");
  const [whyChooseUsCards, setWhyChooseUsCards] = useState<any[]>([]);
  const [editingWhyChooseUsCardIdx, setEditingWhyChooseUsCardIdx] = useState<number | null>(null);
  const [whyChooseUsCardIcon, setWhyChooseUsCardIcon] = useState("ShieldCheck");
  const [whyChooseUsCardTitle, setWhyChooseUsCardTitle] = useState("");
  const [whyChooseUsCardCopy, setWhyChooseUsCardCopy] = useState("");
  const [savingWhyChooseUs, setSavingWhyChooseUs] = useState(false);

  // Blogs State
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [editingBlogIdx, setEditingBlogIdx] = useState<number | null>(null);
  const [blogTag, setBlogTag] = useState("");
  const [blogTagSub, setBlogTagSub] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImages, setBlogImages] = useState<string[]>([]);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
  const [uploadingBlogGallery, setUploadingBlogGallery] = useState(false);

  // News State
  const [newsList, setNewsList] = useState<any[]>([]);
  const [editingNewsIdx, setEditingNewsIdx] = useState<number | null>(null);
  const [newsPublisher, setNewsPublisher] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [newsHeadline, setNewsHeadline] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [newsDetail, setNewsDetail] = useState("");
  const [newsIcon, setNewsIcon] = useState("Newspaper");
  const [newsImages, setNewsImages] = useState<string[]>([]);
  const [uploadingNewsGallery, setUploadingNewsGallery] = useState(false);

  // Blogs Page Header State
  const [blogsHeaderTitle, setBlogsHeaderTitle] = useState("");
  const [blogsHeaderSubtitle, setBlogsHeaderSubtitle] = useState("");
  const [savingBlogsHeader, setSavingBlogsHeader] = useState(false);
  const [showHeaderEdit, setShowHeaderEdit] = useState(false);

  // News Page Header State
  const [newsHeaderTitle, setNewsHeaderTitle] = useState("");
  const [newsHeaderSubtitle, setNewsHeaderSubtitle] = useState("");
  const [savingNewsHeader, setSavingNewsHeader] = useState(false);
  const [showNewsHeaderEdit, setShowNewsHeaderEdit] = useState(false);

  // Contact Us Page State
  const [contactHeaderEyebrow, setContactHeaderEyebrow] = useState("Contact Us");
  const [contactHeaderTitle, setContactHeaderTitle] = useState("Need help with products, orders, or your stack?");
  const [contactHeaderSubtitle, setContactHeaderSubtitle] = useState("Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.");
  const [contactHeaderBgImage, setContactHeaderBgImage] = useState("https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop");
  const [contactWhatsapp, setContactWhatsapp] = useState("919876543210");
  const [savingContactHeader, setSavingContactHeader] = useState(false);

  const [contactInfoCards, setContactInfoCards] = useState<any[]>([]);
  const [newInfoIcon, setNewInfoIcon] = useState("Phone");
  const [newInfoTitle, setNewInfoTitle] = useState("");
  const [newInfoValue, setNewInfoValue] = useState("");
  const [savingContactInfoCards, setSavingContactInfoCards] = useState(false);

  const [contactSupportCards, setContactSupportCards] = useState<any[]>([]);
  const [newSupportIcon, setNewSupportIcon] = useState("Headphones");
  const [newSupportTitle, setNewSupportTitle] = useState("");
  const [newSupportCopy, setNewSupportCopy] = useState("");
  const [savingContactSupportCards, setSavingContactSupportCards] = useState(false);

  const [contactStores, setContactStores] = useState<any[]>([]);
  const [newStoreId, setNewStoreId] = useState("");
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreAddress, setNewStoreAddress] = useState("");
  const [newStoreTimings, setNewStoreTimings] = useState("");
  const [newStoreMapUrl, setNewStoreMapUrl] = useState("");
  const [newStoreDirectionsUrl, setNewStoreDirectionsUrl] = useState("");
  const [editingStoreIdx, setEditingStoreIdx] = useState<number | null>(null);
  const [savingContactStores, setSavingContactStores] = useState(false);

  const [contactFaqs, setContactFaqs] = useState<any[]>([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [editingFaqIdx, setEditingFaqIdx] = useState<number | null>(null);
  const [savingContactFaqs, setSavingContactFaqs] = useState(false);

  // Banners State
  const [bannersList, setBannersList] = useState<any[]>([]);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerEyebrow, setBannerEyebrow] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerRedirectUrl, setBannerRedirectUrl] = useState("/shop");
  const [bannerSortOrder, setBannerSortOrder] = useState(0);
  const [bannerIsActive, setBannerIsActive] = useState(true);
  const [uploadingBannerImage, setUploadingBannerImage] = useState(false);
  const [savingBanner, setSavingBanner] = useState(false);

  // Website Logo state
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savingLogo, setSavingLogo] = useState(false);

  // Authenticity Hero state
  const [authTagline, setAuthTagline] = useState("Authenticity & Testing");
  const [authSubtitle, setAuthSubtitle] = useState("Manufactured In");
  const [authTitle, setAuthTitle] = useState("WORLD CLASS FACILITY");
  const [authBgImage, setAuthBgImage] = useState("");
  const [authBadges, setAuthBadges] = useState<any[]>([]);
  const [savingAuthHero, setSavingAuthHero] = useState(false);
  const [uploadingAuthBg, setUploadingAuthBg] = useState(false);
  const [uploadingContactBg, setUploadingContactBg] = useState(false);

  const [newBadgeCode, setNewBadgeCode] = useState("");
  const [newBadgeTitle, setNewBadgeTitle] = useState("");
  const [newBadgeSubtitle, setNewBadgeSubtitle] = useState("");
  const [newBadgeColor, setNewBadgeColor] = useState("yellow");
  const [editingBadgeIdx, setEditingBadgeIdx] = useState<number | null>(null);

  // Footer state
  const [footerStats, setFooterStats] = useState<any[]>([]);
  const [statValue, setStatValue] = useState("");
  const [statLabel, setStatLabel] = useState("");
  const [statStyle, setStatStyle] = useState("default");
  const [editingStatIdx, setEditingStatIdx] = useState<number | null>(null);

  const [newsletterTitle, setNewsletterTitle] = useState("Newsletter");
  const [newsletterDesc, setNewsletterDesc] = useState("Subscribe to get early access to exclusive drops, new formulations, and members-only deals.");

  const [socialFb, setSocialFb] = useState("#");
  const [socialIg, setSocialIg] = useState("#");
  const [socialTw, setSocialTw] = useState("#");
  const [socialYt, setSocialYt] = useState("#");

  const [savingFooterStats, setSavingFooterStats] = useState(false);
  const [savingNewsletter, setSavingNewsletter] = useState(false);
  const [savingSocials, setSavingSocials] = useState(false);
  const [savingFooterConfig, setSavingFooterConfig] = useState(false);

  // Authenticity Explainer Page state
  const [authExplainerHeroEyebrow, setAuthExplainerHeroEyebrow] = useState("Authenticity Guaranteed");
  const [authExplainerHeroTitle, setAuthExplainerHeroTitle] = useState("Quality Meets Authenticity");
  const [authExplainerHeroDesc, setAuthExplainerHeroDesc] = useState("");
  const [authExplainerHeroBg, setAuthExplainerHeroBg] = useState("");
  const [authExplainerEyebrow, setAuthExplainerEyebrow] = useState("What is a Trust Seal?");
  const [authExplainerTitle, setAuthExplainerTitle] = useState("Trust Seal for Protein Authenticity & Report");
  const [authExplainerDesc, setAuthExplainerDesc] = useState("");
  const [authExplainerScratch, setAuthExplainerScratch] = useState("BM-AAX5010");
  const [authExplainerScanText, setAuthExplainerScanText] = useState("Scan for labs & use the scratch code for authentication");
  const [authExplainerPoints, setAuthExplainerPoints] = useState<string[]>([]);
  const [authExplainerSteps, setAuthExplainerSteps] = useState<any[]>([]);
  const [authExplainerCertEyebrow, setAuthExplainerCertEyebrow] = useState("Third-Party Certified");
  const [authExplainerCertTitle, setAuthExplainerCertTitle] = useState("Every Batch. Every Test.");
  const [authExplainerCertDesc, setAuthExplainerCertDesc] = useState("");
  const [authExplainerSampleTitle, setAuthExplainerSampleTitle] = useState("Lab Report — Sample Result");
  const [authExplainerSampleFooter, setAuthExplainerSampleFooter] = useState("");
  const [authExplainerSampleResults, setAuthExplainerSampleResults] = useState<any[]>([]);
  const [authExplainerBadges, setAuthExplainerBadges] = useState<any[]>([]);
  const [authExplainerCtaTitle, setAuthExplainerCtaTitle] = useState("Shop with Complete Confidence");
  const [authExplainerCtaDesc, setAuthExplainerCtaDesc] = useState("");
  const [savingAuthExplainer, setSavingAuthExplainer] = useState(false);
  const [uploadingAuthExplainerBg, setUploadingAuthExplainerBg] = useState(false);
  const [newExplainerPoint, setNewExplainerPoint] = useState("");

  // Website name state
  const [websiteName, setWebsiteName] = useState("PRABHA PHARMA");

  // Business Enquiry States
  const [b2bHeroEyebrow, setB2bHeroEyebrow] = useState("B2B Partnerships");
  const [b2bHeroTitle, setB2bHeroTitle] = useState("Sell Muscleyn");
  const [b2bHeroDesc, setB2bHeroDesc] = useState("");
  const [b2bContactEmail, setB2bContactEmail] = useState("");
  const [b2bContactPhone, setB2bContactPhone] = useState("");
  const [b2bBenefits, setB2bBenefits] = useState<any[]>([]);
  const [savingB2bConfig, setSavingB2bConfig] = useState(false);
  const [newB2bBenefitTitle, setNewB2bBenefitTitle] = useState("");
  const [newB2bBenefitDesc, setNewB2bBenefitDesc] = useState("");
  const [newB2bBenefitIcon, setNewB2bBenefitIcon] = useState("ShieldAlert");

  // Section Visibility States
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true,
    trustTicker: true,
    dealOfTheDay: true,
    shopByGoal: true,
    featuredProducts: true,
    realReviews: true,
    whyChooseUs: true,
    brandFilm: true,
    bestSellers: true,
    blogs: true,
    news: true,
  });
  const [savingSectionVisibility, setSavingSectionVisibility] = useState(false);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["flash", "terms", "privacy", "goals", "blogs", "news", "return", "contact", "authenticity", "footer", "auth-explainer", "business-enquiry", "visibility", "home-sections"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // LOAD ALL CONFIGS
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);
        const [termsRes, privacyRes, returnRes, tickerRes, flashRes, goalsRes, blogsRes, newsRes, blogsHeaderRes, newsHeaderRes, contactHeaderRes, contactInfoRes, contactSupportRes, contactStoresRes, contactFaqsRes, bannersRes, authHeroRes, footerConfigRes, logoRes, authExplainerRes, businessEnquiryRes, brandFilmRes, whyChooseUsRes, sectionVisibilityRes] = await Promise.allSettled([
          api.get(`/cms/terms-and-conditions?t=${Date.now()}`),
          api.get(`/cms/privacy-policy?t=${Date.now()}`),
          api.get(`/cms/return-refund-policy?t=${Date.now()}`),
          api.get(`/cms/trust-ticker-list?t=${Date.now()}`),
          api.get(`/cms/flash-sale-offer?t=${Date.now()}`),
          api.get(`/cms/goals-list?t=${Date.now()}`),
          api.get(`/cms/blogs-list?t=${Date.now()}`),
          api.get(`/cms/news-list?t=${Date.now()}`),
          api.get(`/cms/blogs-page-header?t=${Date.now()}`),
          api.get(`/cms/news-page-header?t=${Date.now()}`),
          api.get(`/cms/contact-header?t=${Date.now()}`),
          api.get(`/cms/contact-info-cards?t=${Date.now()}`),
          api.get(`/cms/contact-support-cards?t=${Date.now()}`),
          api.get(`/cms/contact-stores?t=${Date.now()}`),
          api.get(`/cms/contact-faqs?t=${Date.now()}`),
          api.get(`/banners?t=${Date.now()}`),
          api.get(`/cms/authenticity-hero?t=${Date.now()}`),
          api.get(`/cms/footer-config?t=${Date.now()}`),
          api.get(`/cms/website-logo?t=${Date.now()}`),
          api.get(`/cms/authenticity-page-config?t=${Date.now()}`),
          api.get(`/cms/business-enquiry-config?t=${Date.now()}`),
          api.get(`/cms/home-brand-film?t=${Date.now()}`),
          api.get(`/cms/home-why-choose-us?t=${Date.now()}`),
          api.get(`/cms/home-section-visibility?t=${Date.now()}`)
        ]);

        if (termsRes.status === "fulfilled" && termsRes.value.data.data) {
          setTerms(termsRes.value.data.data.cmsValue || "");
        }
        if (privacyRes.status === "fulfilled" && privacyRes.value.data.data) {
          setPrivacy(privacyRes.value.data.data.cmsValue || "");
        }
        if (returnRes.status === "fulfilled" && returnRes.value.data.data) {
          setReturnPolicy(returnRes.value.data.data.cmsValue || "");
        }
        if (tickerRes.status === "fulfilled" && tickerRes.value.data.data && tickerRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(tickerRes.value.data.data.cmsValue);
            if (Array.isArray(parsed)) {
              setTrustTickerList(parsed);
            }
          } catch (e) {
            console.log("Failed to parse trust ticker list JSON");
          }
        } else {
          setTrustTickerList(["50K+ Customers", "10K+ Orders Delivered", "500+ Products", "Trusted By Athletes"]);
        }
        if (flashRes.status === "fulfilled" && flashRes.value.data.data && flashRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(flashRes.value.data.data.cmsValue);
            setFlashActive(parsed.active !== false);
            setFlashTitle(parsed.title || "Flash Sale Active");
            setFlashSubtitle(parsed.subtitle || "Up to 40% off on all whey proteins.");
            setFlashHours(parsed.hours ?? 12);
            setFlashMinutes(parsed.minutes ?? 45);
            setFlashSeconds(parsed.seconds ?? 30);
          } catch (e) {
            console.log("Failed to parse flash sale JSON");
          }
        }
        if (goalsRes.status === "fulfilled" && goalsRes.value.data.data && goalsRes.value.data.data.cmsValue) {
          try {
            setGoalsList(JSON.parse(goalsRes.value.data.data.cmsValue));
          } catch (e) { }
        }
        if (blogsRes.status === "fulfilled" && blogsRes.value.data.data && blogsRes.value.data.data.cmsValue) {
          try {
            setBlogsList(JSON.parse(blogsRes.value.data.data.cmsValue));
          } catch (e) { }
        }
        if (newsRes.status === "fulfilled" && newsRes.value.data.data && newsRes.value.data.data.cmsValue) {
          try {
            setNewsList(JSON.parse(newsRes.value.data.data.cmsValue));
          } catch (e) { }
        }
        if (blogsHeaderRes.status === "fulfilled" && blogsHeaderRes.value.data.data && blogsHeaderRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(blogsHeaderRes.value.data.data.cmsValue);
            setBlogsHeaderTitle(parsed.title || "");
            setBlogsHeaderSubtitle(parsed.subtitle || "");
          } catch (e) { }
        }
        if (newsHeaderRes.status === "fulfilled" && newsHeaderRes.value.data.data && newsHeaderRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(newsHeaderRes.value.data.data.cmsValue);
            setNewsHeaderTitle(parsed.title || "");
            setNewsHeaderSubtitle(parsed.subtitle || "");
          } catch (e) { }
        }
        if (contactHeaderRes.status === "fulfilled" && contactHeaderRes.value.data.data && contactHeaderRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(contactHeaderRes.value.data.data.cmsValue);
            setContactHeaderEyebrow(parsed.eyebrow || "Contact Us");
            setContactHeaderTitle(parsed.title || "Need help with products, orders, or your stack?");
            setContactHeaderSubtitle(parsed.description || "Reach the Muscleyn support team for product guidance, order questions, partnerships, or business enquiries.");
            setContactHeaderBgImage(parsed.bgImage || "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1800&auto=format&fit=crop");
            setContactWhatsapp(parsed.whatsapp || "919876543210");
          } catch (e) { }
        }
        if (contactInfoRes.status === "fulfilled" && contactInfoRes.value.data.data && contactInfoRes.value.data.data.cmsValue) {
          try {
            setContactInfoCards(JSON.parse(contactInfoRes.value.data.data.cmsValue));
          } catch (e) { }
        } else {
          setContactInfoCards([
            { icon: "Phone", title: "Phone", value: "+91 98765 43210" },
            { icon: "Mail", title: "Email", value: "support@muscleyn.com" },
            { icon: "MapPin", title: "Business", value: "Fitness District, Indore, India" },
            { icon: "Clock", title: "Support Hours", value: "Mon-Sat, 10:00 AM - 7:00 PM" }
          ]);
        }
        if (contactSupportRes.status === "fulfilled" && contactSupportRes.value.data.data && contactSupportRes.value.data.data.cmsValue) {
          try {
            setContactSupportCards(JSON.parse(contactSupportRes.value.data.data.cmsValue));
          } catch (e) { }
        } else {
          setContactSupportCards([
            { icon: "Headphones", title: "Order Support", copy: "Delivery, payment, returns" },
            { icon: "MessageCircle", title: "Stack Guidance", copy: "Goal-based supplement advice" },
            { icon: "Send", title: "Social", copy: "Follow drops and athlete stories" }
          ]);
        }
        if (contactStoresRes.status === "fulfilled" && contactStoresRes.value.data.data && contactStoresRes.value.data.data.cmsValue) {
          try {
            setContactStores(JSON.parse(contactStoresRes.value.data.data.cmsValue));
          } catch (e) { }
        } else {
          setContactStores([
            {
              id: "indore",
              name: "Muscleyn Indore HQ",
              address: "Vijay Nagar, Indore, Madhya Pradesh 452010",
              timings: "Mon-Sat, 10 AM - 7 PM",
              mapUrl: "https://www.google.com/maps?q=22.7533,75.8937&z=16&output=embed",
              directionsUrl: "https://www.google.com/maps?q=22.7533,75.8937"
            },
            {
              id: "mumbai",
              name: "Muscleyn Mumbai Experience Center",
              address: "Bandra West, Link Road, Mumbai, Maharashtra 400050",
              timings: "Mon-Sun, 11 AM - 8 PM",
              mapUrl: "https://www.google.com/maps?q=19.0600,72.8311&z=16&output=embed",
              directionsUrl: "https://www.google.com/maps?q=19.0600,72.8311"
            },
            {
              id: "delhi",
              name: "Muscleyn Delhi Experience Center",
              address: "Connaught Place, Radial Road 1, New Delhi 110001",
              timings: "Mon-Sun, 10 AM - 9 PM",
              mapUrl: "https://www.google.com/maps?q=28.6304,77.2177&z=16&output=embed",
              directionsUrl: "https://www.google.com/maps?q=28.6304,77.2177"
            },
            {
              id: "bengaluru",
              name: "Muscleyn Bengaluru Experience Center",
              address: "Indiranagar, 100 Feet Rd, Bengaluru, Karnataka 560038",
              timings: "Mon-Sat, 10 AM - 8 PM",
              mapUrl: "https://www.google.com/maps?q=12.9719,77.6412&z=16&output=embed",
              directionsUrl: "https://www.google.com/maps?q=12.9719,77.6412"
            }
          ]);
        }
        if (contactFaqsRes.status === "fulfilled" && contactFaqsRes.value.data.data && contactFaqsRes.value.data.data.cmsValue) {
          try {
            setContactFaqs(JSON.parse(contactFaqsRes.value.data.data.cmsValue));
          } catch (e) { }
        } else {
          setContactFaqs([
            {
              question: "How fast do you ship orders?",
              answer: "Most orders are prepared within 24 hours. Final delivery depends on the destination and courier coverage."
            },
            {
              question: "Can I get help choosing a supplement stack?",
              answer: "Yes. Share your training goal, diet preference, and budget through the contact form and support can guide you."
            },
            {
              question: "Do you support cash on delivery?",
              answer: "COD can be enabled based on delivery location and order value. The checkout flow is structured for this support."
            }
          ]);
        }
        if (bannersRes.status === "fulfilled" && bannersRes.value.data.data) {
          setBannersList(bannersRes.value.data.data);
        }
        if (authHeroRes.status === "fulfilled" && authHeroRes.value.data.data && authHeroRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(authHeroRes.value.data.data.cmsValue);
            setAuthTagline(parsed.tagline || "Authenticity & Testing");
            setAuthSubtitle(parsed.subtitle || "Manufactured In");
            setAuthTitle(parsed.title || "WORLD CLASS FACILITY");
            setAuthBgImage(parsed.bgImage || "");
            setAuthBadges(parsed.badges || []);
          } catch (e) {
            console.log("Failed to parse authenticity-hero JSON");
          }
        } else {
          setAuthTagline("Authenticity & Testing");
          setAuthSubtitle("Manufactured In");
          setAuthTitle("WORLD CLASS FACILITY");
          setAuthBgImage("");
          setAuthBadges([
            { code: "cGMP", title: "cGMP Certified", subtitle: "Current Practice", color: "yellow" },
            { code: "HACCP", title: "HACCP Safety", subtitle: "Food Safety Certified", color: "blue" },
            { code: "fssai", title: "fssai approved", subtitle: "Standard Compliance", color: "green" },
            { code: "KOSHER", title: "Kosher Food", subtitle: "Pure Ingredients", color: "emerald" },
            { code: "FSSC", title: "FSSC 22000", subtitle: "Sustained Quality", color: "teal" },
            { code: "100%", title: "Third Party", subtitle: "Independent Lab Tested", color: "red" }
          ]);
        }
        if (footerConfigRes.status === "fulfilled" && footerConfigRes.value.data.data && footerConfigRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(footerConfigRes.value.data.data.cmsValue);
            setFooterStats(parsed.whyChoose || []);
            setNewsletterTitle(parsed.newsletter?.title || "Newsletter");
            setNewsletterDesc(parsed.newsletter?.description || "");
            setSocialFb(parsed.socials?.fb || "#");
            setSocialIg(parsed.socials?.ig || "#");
            setSocialTw(parsed.socials?.tw || "#");
            setSocialYt(parsed.socials?.yt || "#");
          } catch (e) {
            console.log("Failed to parse footer-config JSON");
          }
        } else {
          setFooterStats([
            { value: "16 YEARS", label: "Leading Sports Nutrition Brand", style: "default" },
            { value: "10M+", label: "Happy Customers", style: "red" },
            { value: "100+", label: "Genuine Products", style: "default" },
            { value: "100%", label: "Genuine Products", style: "default" },
            { value: "FREE", label: "Fast Shipping", style: "grey" }
          ]);
          setNewsletterTitle("Newsletter");
          setNewsletterDesc("Subscribe to get early access to exclusive drops, new formulations, and members-only deals.");
          setSocialFb("#");
          setSocialIg("#");
          setSocialTw("#");
          setSocialYt("#");
        }

        if (logoRes.status === "fulfilled" && logoRes.value.data.data && logoRes.value.data.data.cmsValue) {
          const val = logoRes.value.data.data.cmsValue;
          try {
            const parsed = JSON.parse(val);
            setLogoUrl(parsed.logoUrl || "");
            setWebsiteName(parsed.websiteName || "PRABHA PHARMA");
          } catch (e) {
            setLogoUrl(val);
            setWebsiteName("PRABHA PHARMA");
          }
        } else {
          setLogoUrl("");
          setWebsiteName("PRABHA PHARMA");
        }

        if (authExplainerRes.status === "fulfilled" && authExplainerRes.value.data.data && authExplainerRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(authExplainerRes.value.data.data.cmsValue);
            if (parsed.hero) {
              setAuthExplainerHeroEyebrow(parsed.hero.eyebrow || "Authenticity Guaranteed");
              setAuthExplainerHeroTitle(parsed.hero.title || "Quality Meets Authenticity");
              setAuthExplainerHeroDesc(parsed.hero.description || "");
              setAuthExplainerHeroBg(parsed.hero.bgImage || "");
            }
            if (parsed.explainer) {
              setAuthExplainerEyebrow(parsed.explainer.eyebrow || "What is a Trust Seal?");
              setAuthExplainerTitle(parsed.explainer.title || "Trust Seal for Protein Authenticity & Report");
              setAuthExplainerDesc(parsed.explainer.description || "");
              setAuthExplainerScratch(parsed.explainer.scratchCode || "BM-AAX5010");
              setAuthExplainerScanText(parsed.explainer.scanText || "Scan for labs & use the scratch code for authentication");
              setAuthExplainerPoints(parsed.explainer.points || []);
            }
            if (parsed.process) {
              setAuthExplainerSteps(parsed.process.steps || []);
            }
            if (parsed.certification) {
              setAuthExplainerCertEyebrow(parsed.certification.eyebrow || "Third-Party Certified");
              setAuthExplainerCertTitle(parsed.certification.title || "Every Batch. Every Test.");
              setAuthExplainerCertDesc(parsed.certification.description || "");
              setAuthExplainerSampleTitle(parsed.certification.sampleReportTitle || "Lab Report — Sample Result");
              setAuthExplainerSampleFooter(parsed.certification.sampleReportFooter || "");
              setAuthExplainerSampleResults(parsed.certification.sampleResults || []);
              setAuthExplainerBadges(parsed.certification.badges || []);
            }
            if (parsed.cta) {
              setAuthExplainerCtaTitle(parsed.cta.title || "Shop with Complete Confidence");
              setAuthExplainerCtaDesc(parsed.cta.description || "");
            }
          } catch (e) {
            console.log("Failed to parse authenticity-page-config JSON");
          }
        } else {
          setAuthExplainerHeroEyebrow("Authenticity Guaranteed");
          setAuthExplainerHeroTitle("Quality Meets Authenticity");
          setAuthExplainerHeroDesc("Our guarantee stands strong. Every product sold on Prabha Pharma carries a Trust Seal — scan it to verify authenticity and access NABL-certified lab reports instantly.");
          setAuthExplainerHeroBg("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1800&auto=format&fit=crop");
          setAuthExplainerEyebrow("What is a Trust Seal?");
          setAuthExplainerTitle("Trust Seal for Protein Authenticity & Report");
          setAuthExplainerDesc("The Trust Seal is used to authenticate and verify your product. Additionally, you can check the lab reports tested by NABL-accredited labs which showcase the protein content, heavy metal profile, amino acid profiles, and more.");
          setAuthExplainerScratch("BM-AAX5010");
          setAuthExplainerScanText("Scan for labs & use the scratch code for authentication");
          setAuthExplainerPoints([
            "NABL-accredited third-party lab testing",
            "Protein content verification",
            "Heavy metal profiling",
            "Amino acid profile analysis",
            "Holographic scratch-code anti-counterfeit"
          ]);
          setAuthExplainerSteps([
            { step: "01", title: "Scan the Trust Seal", description: "Find the holographic Trust Seal sticker on your product packaging and scan the QR code using any smartphone camera.", iconName: "ScanLine" },
            { step: "02", title: "You're on Our Website", description: "The QR code lands you directly on our official Prabha Pharma verification portal — no third-party redirects.", iconName: "ShieldCheck" },
            { step: "03", title: "View Lab Test Report", description: "Access the full NABL-accredited third-party lab report showing protein content, heavy metal profile, and amino acid analysis.", iconName: "FlaskConical" }
          ]);
          setAuthExplainerCertEyebrow("Third-Party Certified");
          setAuthExplainerCertTitle("Every Batch. Every Test.");
          setAuthExplainerCertDesc("Our products are independently tested by NABL-accredited laboratories. The results are published and accessible to every customer through the Trust Seal QR code on the product.");
          setAuthExplainerSampleTitle("Lab Report — Sample Result");
          setAuthExplainerSampleFooter("Tested by SGS India Pvt. Ltd. | NABL Accredited | Certificate No. TC-7721");
          setAuthExplainerSampleResults([
            { label: "Protein Percentage", result: "Pass" },
            { label: "Heavy Metal", result: "Pass" },
            { label: "Amino Acid Profile", result: "Pass" },
            { label: "Microbial Safety", result: "Pass" }
          ]);
          setAuthExplainerBadges([
            { label: "NABL Accredited", sub: "Third-party lab tested", iconName: "Award" },
            { label: "100% Authentic", sub: "Verified with Trust Seal", iconName: "ShieldCheck" },
            { label: "Protein Verified", sub: "Clinically validated dosage", iconName: "FlaskConical" },
            { label: "Heavy Metal Safe", sub: "Within permissible limits", iconName: "CheckCircle2" }
          ]);
        }

        if (businessEnquiryRes.status === "fulfilled" && businessEnquiryRes.value.data.data && businessEnquiryRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(businessEnquiryRes.value.data.data.cmsValue);
            setB2bHeroEyebrow(parsed.hero?.eyebrow || "B2B Partnerships");
            setB2bHeroTitle(parsed.hero?.title || "Sell Muscleyn");
            setB2bHeroDesc(parsed.hero?.description || "");
            setB2bContactEmail(parsed.contact?.email || "");
            setB2bContactPhone(parsed.contact?.phone || "");
            setB2bBenefits(parsed.benefits || []);
          } catch (e) {
            console.log("Failed to parse business-enquiry-config JSON");
          }
        } else {
          setB2bHeroEyebrow("B2B Partnerships");
          setB2bHeroTitle("Sell Muscleyn");
          setB2bHeroDesc("Expand your business by partnering with India's premium, NABL-certified, and third-party tested fitness supplement brand. Become a distributor today.");
          setB2bContactEmail("partners@muscleyn.com");
          setB2bContactPhone("+91 98765 43210");
          setB2bBenefits([
            { iconName: "ShieldAlert", title: "100% Genuine Catalog", desc: "Every supplement is third-party tested with QR code authenticity tags and lab report lookups." },
            { iconName: "Percent", title: "Competitive Margins", desc: "Access bulk wholesale pricing tiers that leave you with industry-leading profit margins." },
            { iconName: "Truck", title: "Priority Fulfillment", desc: "B2B orders are processed and shipped via express courier nodes directly to your business address." },
            { iconName: "TrendingUp", title: "Marketing Assets", desc: "Receive premium in-store branding, shaker bottles, gym posters, and official merchandise." }
          ]);
        }

        if (brandFilmRes.status === "fulfilled" && brandFilmRes.value.data.data && brandFilmRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(brandFilmRes.value.data.data.cmsValue);
            setBrandFilmEyebrow(parsed.eyebrow || "The Standard");
            setBrandFilmTitle(parsed.title || "Built for lifters who respect the work");
            setBrandFilmDesc(parsed.description || "");
            setBrandFilmImageUrl(parsed.imageUrl || "");
          } catch (e) {
            console.log("Failed to parse home-brand-film JSON");
          }
        } else {
          setBrandFilmEyebrow("The Standard");
          setBrandFilmTitle("Built for lifters who respect the work");
          setBrandFilmDesc("Watch our latest campaign featuring IFBB Pro athletes pushing their limits. We formulate products for those who demand more from themselves and their nutrition.");
          setBrandFilmImageUrl("");
        }

        if (whyChooseUsRes.status === "fulfilled" && whyChooseUsRes.value.data.data && whyChooseUsRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(whyChooseUsRes.value.data.data.cmsValue);
            setWhyChooseUsEyebrow(parsed.eyebrow || "Why Choose Us");
            setWhyChooseUsTitle(parsed.title || "Premium quality without the gym-bro noise");
            setWhyChooseUsDesc(parsed.description || "");
            setWhyChooseUsCards(parsed.cards || []);
          } catch (e) {
            console.log("Failed to parse home-why-choose-us JSON");
          }
        } else {
          setWhyChooseUsEyebrow("Why Choose Us");
          setWhyChooseUsTitle("Premium quality without the gym-bro noise");
          setWhyChooseUsDesc("We believe in full transparency. No proprietary blends, no cheap fillers. Just clinically dosed, scientifically backed nutrition for real athletes.");
          setWhyChooseUsCards([
            { iconName: "ShieldCheck", title: "Batch Tested", copy: "Every batch is quality checked for consistency and purity by independent labs." },
            { iconName: "Truck", title: "Fast Fulfillment", copy: "Optimized delivery flow and clear order updates. Next-day delivery on elite stacks." },
            { iconName: "BadgeCheck", title: "Authentic Formulas", copy: "Transparent nutrition and premium sourcing. No proprietary blends or hidden fillers." },
            { iconName: "Dumbbell", title: "Athlete Focused", copy: "Built around real training goals and routines, trusted by IFBB pros." }
          ]);
        }
        if (sectionVisibilityRes.status === "fulfilled" && sectionVisibilityRes.value.data.data && sectionVisibilityRes.value.data.data.cmsValue) {
          try {
            const parsed = JSON.parse(sectionVisibilityRes.value.data.data.cmsValue);
            setSectionVisibility((prev) => ({ ...prev, ...parsed }));
          } catch (e) {
            console.log("Failed to parse home-section-visibility JSON");
          }
        }
      } catch (err) {
        console.error("Failed to load CMS values", err);
        toast.error("Failed to load CMS configurations");
      } finally {
        setLoading(false);
      }
    };
    loadConfigs();
  }, []);

  // SAVE SECTION VISIBILITY
  const handleSaveSectionVisibility = async () => {
    try {
      setSavingSectionVisibility(true);
      await api.post("/cms", {
        cmsKey: "home-section-visibility",
        cmsValue: JSON.stringify(sectionVisibility),
      });
      toast.success("Section visibility saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save section visibility");
    } finally {
      setSavingSectionVisibility(false);
    }
  };

  // SAVE TERMS
  const handleSaveTerms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingTerms(true);
      await api.post("/cms", {
        cmsKey: "terms-and-conditions",
        cmsValue: terms,
      });
      toast.success("Terms & Conditions saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Terms & Conditions");
    } finally {
      setSavingTerms(false);
    }
  };

  // SAVE CONTACT HEADER
  const handleSaveContactHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingContactHeader(true);
      const val = {
        eyebrow: contactHeaderEyebrow,
        title: contactHeaderTitle,
        description: contactHeaderSubtitle,
        bgImage: contactHeaderBgImage,
        whatsapp: contactWhatsapp,
      };
      await api.post("/cms", {
        cmsKey: "contact-header",
        cmsValue: JSON.stringify(val),
      });
      toast.success("Contact Header saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Contact Header");
    } finally {
      setSavingContactHeader(false);
    }
  };

  // SAVE CONTACT INFO CARDS
  const handleSaveContactInfoCards = async () => {
    try {
      setSavingContactInfoCards(true);
      await api.post("/cms", {
        cmsKey: "contact-info-cards",
        cmsValue: JSON.stringify(contactInfoCards),
      });
      toast.success("Contact info cards saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save contact info cards");
    } finally {
      setSavingContactInfoCards(false);
    }
  };

  // SAVE CONTACT SUPPORT CARDS
  const handleSaveContactSupportCards = async () => {
    try {
      setSavingContactSupportCards(true);
      await api.post("/cms", {
        cmsKey: "contact-support-cards",
        cmsValue: JSON.stringify(contactSupportCards),
      });
      toast.success("Support guidance cards saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save support guidance cards");
    } finally {
      setSavingContactSupportCards(false);
    }
  };

  // SAVE CONTACT STORES
  const handleSaveContactStores = async () => {
    try {
      setSavingContactStores(true);
      await api.post("/cms", {
        cmsKey: "contact-stores",
        cmsValue: JSON.stringify(contactStores),
      });
      toast.success("Store locations saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save store locations");
    } finally {
      setSavingContactStores(false);
    }
  };

  // SAVE CONTACT FAQS
  const handleSaveContactFaqs = async () => {
    try {
      setSavingContactFaqs(true);
      await api.post("/cms", {
        cmsKey: "contact-faqs",
        cmsValue: JSON.stringify(contactFaqs),
      });
      toast.success("Contact FAQs saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save contact FAQs");
    } finally {
      setSavingContactFaqs(false);
    }
  };

  // UPLOAD BANNER IMAGE
  const handleUploadBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingBannerImage(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setBannerImageUrl(response.data.data.imageUrl);
        toast.success("Banner image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingBannerImage(false);
    }
  };

  // UPLOAD SITE LOGO
  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setLogoUrl(response.data.data.imageUrl);
        toast.success("Logo image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  // SAVE SITE LOGO
  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingLogo(true);
      const payload = {
        logoUrl,
        websiteName
      };
      await api.post("/cms", {
        cmsKey: "website-logo",
        cmsValue: JSON.stringify(payload),
      });
      if (typeof window !== "undefined" && logoUrl) {
        localStorage.setItem("websiteLogo", logoUrl);
      }
      toast.success("Website Logo & Name saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Website Logo Settings");
    } finally {
      setSavingLogo(false);
    }
  };

  // SAVE BUSINESS ENQUIRY CONFIG
  const handleSaveB2bConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingB2bConfig(true);
      const payload = {
        hero: {
          eyebrow: b2bHeroEyebrow,
          title: b2bHeroTitle,
          description: b2bHeroDesc
        },
        benefits: b2bBenefits,
        contact: {
          email: b2bContactEmail,
          phone: b2bContactPhone
        }
      };
      await api.post("/cms", {
        cmsKey: "business-enquiry-config",
        cmsValue: JSON.stringify(payload)
      });
      toast.success("Business Enquiry page settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Business Enquiry page settings");
    } finally {
      setSavingB2bConfig(false);
    }
  };

  // UPLOAD BRAND FILM IMAGE
  const handleUploadBrandFilmImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingBrandFilmImage(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setBrandFilmImageUrl(response.data.data.imageUrl);
        toast.success("Brand film image uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload brand film image");
    } finally {
      setUploadingBrandFilmImage(false);
    }
  };

  const handleSaveBrandFilm = async () => {
    try {
      setSavingBrandFilm(true);
      const payload = {
        eyebrow: brandFilmEyebrow,
        title: brandFilmTitle,
        description: brandFilmDesc,
        imageUrl: brandFilmImageUrl
      };
      const response = await api.post("/cms", {
        cmsKey: "home-brand-film",
        cmsValue: JSON.stringify(payload)
      });
      if (response.data && response.data.status) {
        toast.success("Brand Film settings saved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save Brand Film settings");
    } finally {
      setSavingBrandFilm(false);
    }
  };

  const handleSaveWhyChooseUs = async () => {
    try {
      setSavingWhyChooseUs(true);
      const payload = {
        eyebrow: whyChooseUsEyebrow,
        title: whyChooseUsTitle,
        description: whyChooseUsDesc,
        cards: whyChooseUsCards
      };
      const response = await api.post("/cms", {
        cmsKey: "home-why-choose-us",
        cmsValue: JSON.stringify(payload)
      });
      if (response.data && response.data.status) {
        toast.success("Why Choose Us settings saved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save Why Choose Us settings");
    } finally {
      setSavingWhyChooseUs(false);
    }
  };

  const handleAddOrEditWhyChooseUsCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whyChooseUsCardTitle.trim()) {
      toast.error("Card title is required");
      return;
    }
    const newCard = {
      iconName: whyChooseUsCardIcon,
      title: whyChooseUsCardTitle.trim(),
      copy: whyChooseUsCardCopy.trim()
    };
    if (editingWhyChooseUsCardIdx !== null) {
      const updated = [...whyChooseUsCards];
      updated[editingWhyChooseUsCardIdx] = newCard;
      setWhyChooseUsCards(updated);
      setEditingWhyChooseUsCardIdx(null);
      toast.success("Card updated in list (Save to persist database changes)");
    } else {
      setWhyChooseUsCards([...whyChooseUsCards, newCard]);
      toast.success("Card added to list (Save to persist database changes)");
    }
    setWhyChooseUsCardTitle("");
    setWhyChooseUsCardCopy("");
    setWhyChooseUsCardIcon("ShieldCheck");
  };

  const handleStartEditWhyChooseUsCard = (idx: number) => {
    const card = whyChooseUsCards[idx];
    setEditingWhyChooseUsCardIdx(idx);
    setWhyChooseUsCardIcon(card.iconName || "ShieldCheck");
    setWhyChooseUsCardTitle(card.title || "");
    setWhyChooseUsCardCopy(card.copy || "");
  };

  const handleDeleteWhyChooseUsCard = (idx: number) => {
    const updated = whyChooseUsCards.filter((_, i) => i !== idx);
    setWhyChooseUsCards(updated);
    toast.success("Card deleted from list (Save to persist database changes)");
    if (editingWhyChooseUsCardIdx === idx) {
      setEditingWhyChooseUsCardIdx(null);
      setWhyChooseUsCardTitle("");
      setWhyChooseUsCardCopy("");
      setWhyChooseUsCardIcon("ShieldCheck");
    }
  };

  // UPLOAD GOAL IMAGE
  const handleUploadGoalImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingGoalImage(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setGoalImg(response.data.data.imageUrl);
        toast.success("Goal image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload goal image");
    } finally {
      setUploadingGoalImage(false);
    }
  };

  // UPLOAD AUTHENTICITY EXPLAINER HERO BACKGROUND
  const handleUploadAuthExplainerBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingAuthExplainerBg(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setAuthExplainerHeroBg(response.data.data.imageUrl);
        toast.success("Background image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload background image");
    } finally {
      setUploadingAuthExplainerBg(false);
    }
  };

  // SAVE AUTHENTICITY EXPLAINER PAGE CONFIG
  const handleSaveAuthExplainer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingAuthExplainer(true);
      const payload = {
        hero: {
          eyebrow: authExplainerHeroEyebrow,
          title: authExplainerHeroTitle,
          description: authExplainerHeroDesc,
          bgImage: authExplainerHeroBg
        },
        explainer: {
          eyebrow: authExplainerEyebrow,
          title: authExplainerTitle,
          description: authExplainerDesc,
          scratchCode: authExplainerScratch,
          scanText: authExplainerScanText,
          points: authExplainerPoints
        },
        process: {
          eyebrow: "Simple Process",
          title: "Product Authentication Tips",
          description: "Three easy steps to verify that what you're consuming is genuine, tested, and safe.",
          steps: authExplainerSteps.length > 0 ? authExplainerSteps : [
            { step: "01", title: "Scan the Trust Seal", description: "Find the holographic Trust Seal sticker on your product packaging and scan the QR code using any smartphone camera.", iconName: "ScanLine" },
            { step: "02", title: "You're on Our Website", description: "The QR code lands you directly on our official Prabha Pharma verification portal — no third-party redirects.", iconName: "ShieldCheck" },
            { step: "03", title: "View Lab Test Report", description: "Access the full NABL-accredited third-party lab report showing protein content, heavy metal profile, and amino acid analysis.", iconName: "FlaskConical" }
          ]
        },
        certification: {
          eyebrow: authExplainerCertEyebrow,
          title: authExplainerCertTitle,
          description: authExplainerCertDesc,
          sampleReportTitle: authExplainerSampleTitle,
          sampleReportFooter: authExplainerSampleFooter,
          sampleResults: authExplainerSampleResults.length > 0 ? authExplainerSampleResults : [
            { label: "Protein Percentage", result: "Pass" },
            { label: "Heavy Metal", result: "Pass" },
            { label: "Amino Acid Profile", result: "Pass" },
            { label: "Microbial Safety", result: "Pass" }
          ],
          badges: authExplainerBadges.length > 0 ? authExplainerBadges : [
            { label: "NABL Accredited", sub: "Third-party lab tested", iconName: "Award" },
            { label: "100% Authentic", sub: "Verified with Trust Seal", iconName: "ShieldCheck" },
            { label: "Protein Verified", sub: "Clinically validated dosage", iconName: "FlaskConical" },
            { label: "Heavy Metal Safe", sub: "Within permissible limits", iconName: "CheckCircle2" }
          ]
        },
        cta: {
          title: authExplainerCtaTitle,
          description: authExplainerCtaDesc,
          btnPrimaryText: "Shop Now",
          btnPrimaryLink: "/shop",
          btnSecondaryText: "Contact Support",
          btnSecondaryLink: "/contact"
        }
      };

      await api.post("/cms", {
        cmsKey: "authenticity-page-config",
        cmsValue: JSON.stringify(payload)
      });
      toast.success("Authenticity Explainer page saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Authenticity Explainer page settings");
    } finally {
      setSavingAuthExplainer(false);
    }
  };

  // SAVE BANNER (CREATE OR UPDATE)
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle || !bannerImageUrl) {
      toast.error("Title and Image URL are required");
      return;
    }
    try {
      setSavingBanner(true);
      const payload = {
        title: bannerTitle,
        eyebrow: bannerEyebrow,
        subtitle: bannerSubtitle,
        imageUrl: bannerImageUrl,
        redirectUrl: bannerRedirectUrl,
        sortOrder: bannerSortOrder,
        isActive: bannerIsActive
      };

      if (editingBannerId !== null) {
        await api.put(`/banners/${editingBannerId}`, payload);
        toast.success("Banner updated successfully!");
      } else {
        await api.post("/banners", payload);
        toast.success("Banner created successfully!");
      }

      // Refresh list
      const listRes = await api.get("/banners");
      if (listRes.data && listRes.data.data) {
        setBannersList(listRes.data.data);
      }

      // Reset form
      setEditingBannerId(null);
      setBannerTitle("");
      setBannerEyebrow("");
      setBannerSubtitle("");
      setBannerImageUrl("");
      setBannerRedirectUrl("/shop");
      setBannerSortOrder(0);
      setBannerIsActive(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save banner");
    } finally {
      setSavingBanner(false);
    }
  };

  // DELETE BANNER
  const handleDeleteBanner = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api.delete(`/banners/${id}`);
      toast.success("Banner deleted successfully!");
      // Refresh list
      const listRes = await api.get("/banners");
      if (listRes.data && listRes.data.data) {
        setBannersList(listRes.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete banner");
    }
  };

  // SAVE PRIVACY
  const handleSavePrivacy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingPrivacy(true);
      await api.post("/cms", {
        cmsKey: "privacy-policy",
        cmsValue: privacy,
      });
      toast.success("Privacy Policy saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Privacy Policy");
    } finally {
      setSavingPrivacy(false);
    }
  };

  // SAVE RETURN POLICY
  const handleSaveReturnPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingReturnPolicy(true);
      await api.post("/cms", {
        cmsKey: "return-refund-policy",
        cmsValue: returnPolicy,
      });
      toast.success("Return & Refund Policy saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Return & Refund Policy");
    } finally {
      setSavingReturnPolicy(false);
    }
  };

  // SAVE TRUST TICKER
  const handleSaveTrustTicker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingTrustTicker(true);
      await api.post("/cms", {
        cmsKey: "trust-ticker-list",
        cmsValue: JSON.stringify(trustTickerList),
      });
      toast.success("Trust Ticker saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Trust Ticker");
    } finally {
      setSavingTrustTicker(false);
    }
  };

  // SAVE FLASH SALE
  const handleSaveFlash = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingFlash(true);
      const cmsValueObj = {
        active: flashActive,
        title: flashTitle,
        subtitle: flashSubtitle,
        hours: Number(flashHours || 0),
        minutes: Number(flashMinutes || 0),
        seconds: Number(flashSeconds || 0),
      };

      await api.post("/cms", {
        cmsKey: "flash-sale-offer",
        cmsValue: JSON.stringify(cmsValueObj),
      });
      toast.success("Flash Sale settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Flash Sale settings");
    } finally {
      setSavingFlash(false);
    }
  };

  // SAVE GOALS
  const handleSaveGoals = async () => {
    try {
      setSavingGoals(true);
      await api.post("/cms", {
        cmsKey: "goals-list",
        cmsValue: JSON.stringify(goalsList),
      });
      toast.success("Goals saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save goals");
    } finally {
      setSavingGoals(false);
    }
  };

  // SAVE BLOGS
  const handleSaveBlogs = async () => {
    try {
      setSavingBlogs(true);
      await api.post("/cms", {
        cmsKey: "blogs-list",
        cmsValue: JSON.stringify(blogsList),
      });
      toast.success("Blogs list saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blogs");
    } finally {
      setSavingBlogs(false);
    }
  };

  // SAVE NEWS
  const handleSaveNews = async () => {
    try {
      setSavingNews(true);
      await api.post("/cms", {
        cmsKey: "news-list",
        cmsValue: JSON.stringify(newsList),
      });
      toast.success("News list saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save news");
    } finally {
      setSavingNews(false);
    }
  };

  // SAVE BLOGS HEADER
  const handleSaveBlogsHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingBlogsHeader(true);
      const cmsValueObj = {
        title: blogsHeaderTitle,
        subtitle: blogsHeaderSubtitle,
      };
      await api.post("/cms", {
        cmsKey: "blogs-page-header",
        cmsValue: JSON.stringify(cmsValueObj),
      });
      toast.success("Blogs page header saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Blogs page header");
    } finally {
      setSavingBlogsHeader(false);
    }
  };

  // SAVE NEWS HEADER
  const handleSaveNewsHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingNewsHeader(true);
      const cmsValueObj = {
        title: newsHeaderTitle,
        subtitle: newsHeaderSubtitle,
      };
      await api.post("/cms", {
        cmsKey: "news-page-header",
        cmsValue: JSON.stringify(cmsValueObj),
      });
      toast.success("News page header saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save News page header");
    } finally {
      setSavingNewsHeader(false);
    }
  };

  // GOALS HELPERS
  const handleAddOrEditGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle || !goalCopy || !goalImg) {
      toast.error("Please fill in all goal fields");
      return;
    }
    const goalItem = { title: goalTitle, copy: goalCopy, img: goalImg };
    if (editingGoalIdx !== null) {
      const updated = [...goalsList];
      updated[editingGoalIdx] = goalItem;
      setGoalsList(updated);
      setEditingGoalIdx(null);
      toast.success("Goal updated in local list. Don't forget to save changes!");
    } else {
      setGoalsList([...goalsList, goalItem]);
      toast.success("Goal added to local list. Don't forget to save changes!");
    }
    setGoalTitle("");
    setGoalCopy("");
    setGoalImg("");
  };

  const handleStartEditGoal = (idx: number) => {
    const item = goalsList[idx];
    setGoalTitle(item.title);
    setGoalCopy(item.copy);
    setGoalImg(item.img);
    setEditingGoalIdx(idx);
  };

  const handleDeleteGoal = (idx: number) => {
    setGoalsList(goalsList.filter((_, i) => i !== idx));
    toast.success("Goal removed from local list. Don't forget to save changes!");
  };

  // BLOGS HELPERS
  const handleUploadMainBlogImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingBlogImage(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setBlogImage(response.data.data.imageUrl);
        toast.success("Main blog image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingBlogImage(false);
    }
  };

  const handleUploadBlogGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingBlogGallery(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setBlogImages((prev) => [...prev, response.data.data.imageUrl]);
        toast.success("Gallery image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload gallery image");
    } finally {
      setUploadingBlogGallery(false);
    }
  };

  const handleUploadNewsGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingNewsGallery(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setNewsImages((prev) => [...prev, response.data.data.imageUrl]);
        toast.success("News gallery image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload gallery image");
    } finally {
      setUploadingNewsGallery(false);
    }
  };

  const handleAddOrEditBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary || !blogContent || !blogImage) {
      toast.error("Please fill in required blog fields");
      return;
    }
    const blogItem = {
      id: editingBlogIdx !== null ? blogsList[editingBlogIdx].id : Date.now(),
      tag: blogTag || "Insights",
      tagSub: blogTagSub || "",
      date: blogDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: blogAuthor || "Admin",
      readTime: blogReadTime || "5 min read",
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      image: blogImage,
      images: blogImages,
      link: "/blogs"
    };

    if (editingBlogIdx !== null) {
      const updated = [...blogsList];
      updated[editingBlogIdx] = blogItem;
      setBlogsList(updated);
      setEditingBlogIdx(null);
      toast.success("Blog updated in local list. Don't forget to save changes!");
    } else {
      setBlogsList([...blogsList, blogItem]);
      toast.success("Blog added to local list. Don't forget to save changes!");
    }
    setBlogTag("");
    setBlogTagSub("");
    setBlogDate("");
    setBlogAuthor("");
    setBlogReadTime("");
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogImage("");
    setBlogImages([]);
  };

  const handleStartEditBlog = (idx: number) => {
    const item = blogsList[idx];
    setBlogTag(item.tag || "");
    setBlogTagSub(item.tagSub || "");
    setBlogDate(item.date || "");
    setBlogAuthor(item.author || "");
    setBlogReadTime(item.readTime || "");
    setBlogTitle(item.title || "");
    setBlogSummary(item.summary || "");
    setBlogContent(item.content || "");
    setBlogImage(item.image || "");
    setBlogImages(item.images || []);
    setEditingBlogIdx(idx);
  };

  const handleDeleteBlog = (idx: number) => {
    setBlogsList(blogsList.filter((_, i) => i !== idx));
    toast.success("Blog removed from local list. Don't forget to save changes!");
  };

  // NEWS HELPERS
  const handleAddOrEditNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsPublisher || !newsHeadline || !newsSummary || !newsDetail) {
      toast.error("Please fill in required news fields");
      return;
    }
    const newsItem = {
      id: editingNewsIdx !== null ? newsList[editingNewsIdx].id : Date.now(),
      publisher: newsPublisher,
      date: newsDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      headline: newsHeadline,
      summary: newsSummary,
      detail: newsDetail,
      icon: newsIcon,
      images: newsImages
    };

    if (editingNewsIdx !== null) {
      const updated = [...newsList];
      updated[editingNewsIdx] = newsItem;
      setNewsList(updated);
      setEditingNewsIdx(null);
      toast.success("News entry updated in local list. Don't forget to save changes!");
    } else {
      setNewsList([...newsList, newsItem]);
      toast.success("News entry added to local list. Don't forget to save changes!");
    }
    setNewsPublisher("");
    setNewsDate("");
    setNewsHeadline("");
    setNewsSummary("");
    setNewsDetail("");
    setNewsIcon("Newspaper");
    setNewsImages([]);
  };

  const handleStartEditNews = (idx: number) => {
    const item = newsList[idx];
    setNewsPublisher(item.publisher || "");
    setNewsDate(item.date || "");
    setNewsHeadline(item.headline || "");
    setNewsSummary(item.summary || "");
    setNewsDetail(item.detail || "");
    setNewsIcon(item.icon || "Newspaper");
    setNewsImages(item.images || []);
    setEditingNewsIdx(idx);
  };

  const handleDeleteNews = (idx: number) => {
    setNewsList(newsList.filter((_, i) => i !== idx));
    toast.success("News removed from local list. Don't forget to save changes!");
  };

  // Authenticity Hero helpers and save
  const handleUploadAuthBgImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingAuthBg(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setAuthBgImage(response.data.data.imageUrl);
        toast.success("Background image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingAuthBg(false);
    }
  };

  const handleUploadContactBgImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    try {
      setUploadingContactBg(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await api.post("/files/upload-product-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status && response.data.data.imageUrl) {
        setContactHeaderBgImage(response.data.data.imageUrl);
        toast.success("Background image uploaded successfully!");
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingContactBg(false);
    }
  };

  const handleSaveAuthHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingAuthHero(true);
      const val = {
        tagline: authTagline,
        subtitle: authSubtitle,
        title: authTitle,
        bgImage: authBgImage,
        badges: authBadges,
      };
      await api.post("/cms", {
        cmsKey: "authenticity-hero",
        cmsValue: JSON.stringify(val),
      });
      toast.success("Authenticity Hero settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Authenticity Hero settings");
    } finally {
      setSavingAuthHero(false);
    }
  };

  const handleAddOrEditBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadgeCode || !newBadgeTitle || !newBadgeSubtitle) {
      toast.error("Please fill in badge code, title and subtitle");
      return;
    }
    const badgeItem = {
      code: newBadgeCode,
      title: newBadgeTitle,
      subtitle: newBadgeSubtitle,
      color: newBadgeColor,
    };
    if (editingBadgeIdx !== null) {
      const updated = [...authBadges];
      updated[editingBadgeIdx] = badgeItem;
      setAuthBadges(updated);
      setEditingBadgeIdx(null);
      toast.success("Badge updated in local list. Don't forget to save changes!");
    } else {
      setAuthBadges([...authBadges, badgeItem]);
      toast.success("Badge added to local list. Don't forget to save changes!");
    }
    setNewBadgeCode("");
    setNewBadgeTitle("");
    setNewBadgeSubtitle("");
    setNewBadgeColor("yellow");
  };

  const handleStartEditBadge = (idx: number) => {
    const item = authBadges[idx];
    setNewBadgeCode(item.code);
    setNewBadgeTitle(item.title);
    setNewBadgeSubtitle(item.subtitle || item.description || "");
    setNewBadgeColor(item.color || "yellow");
    setEditingBadgeIdx(idx);
  };

  const handleDeleteBadge = (idx: number) => {
    setAuthBadges(authBadges.filter((_, i) => i !== idx));
    toast.success("Badge removed from local list. Don't forget to save changes!");
  };

  // Footer Config helpers and save
  const handleAddOrEditStat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statValue || !statLabel) {
      toast.error("Please fill in stat value and label");
      return;
    }
    const statItem = {
      value: statValue,
      label: statLabel,
      style: statStyle,
    };
    if (editingStatIdx !== null) {
      const updated = [...footerStats];
      updated[editingStatIdx] = statItem;
      setFooterStats(updated);
      setEditingStatIdx(null);
      toast.success("Stat updated in local list. Don't forget to save changes!");
    } else {
      setFooterStats([...footerStats, statItem]);
      toast.success("Stat added to local list. Don't forget to save changes!");
    }
    setStatValue("");
    setStatLabel("");
    setStatStyle("default");
  };

  const handleStartEditStat = (idx: number) => {
    const item = footerStats[idx];
    setStatValue(item.value);
    setStatLabel(item.label);
    setStatStyle(item.style || "default");
    setEditingStatIdx(idx);
  };

  const handleDeleteStat = (idx: number) => {
    setFooterStats(footerStats.filter((_, i) => i !== idx));
    toast.success("Stat removed from local list. Don't forget to save changes!");
  };

  const handleSaveFooterConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingFooterConfig(true);
      const val = {
        whyChoose: footerStats,
        newsletter: {
          title: newsletterTitle,
          description: newsletterDesc,
        },
        socials: {
          fb: socialFb,
          ig: socialIg,
          tw: socialTw,
          yt: socialYt,
        },
      };
      await api.post("/cms", {
        cmsKey: "footer-config",
        cmsValue: JSON.stringify(val),
      });
      toast.success("Footer settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Footer settings");
    } finally {
      setSavingFooterConfig(false);
    }
  };

  const switchTab = (tabId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
    window.history.pushState(null, "", `?${params.toString()}`);
    setActiveTab(tabId);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-red-500" />
            CMS Content Settings
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">
            Dynamically manage store policies, homepage goals, blogs, and news coverages.
          </p>
        </div>
      </div>

      {/* TABS SWITCHER */}
      <div className="flex border-b border-white/10 gap-6 flex-wrap">
        {[
          { id: "flash", label: "Homepage Banner", icon: Zap },
          { id: "visibility", label: "Section Visibility", icon: ToggleLeft },
          { id: "goals", label: "Homepage Goals", icon: Settings },
          { id: "home-sections", label: "Homepage Sections", icon: Settings },
          { id: "blogs", label: "Blogs List", icon: FileText },
          { id: "news", label: "News List", icon: Globe },
          { id: "terms", label: "Terms & Conditions", icon: FileText },
          { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
          { id: "return", label: "Return & Refund Policy", icon: FileText },
          { id: "contact", label: "Contact Us Page", icon: Phone },
          { id: "authenticity", label: "Authenticity Banner", icon: ShieldCheck },
          { id: "auth-explainer", label: "Authenticity Page", icon: ShieldCheck },
          { id: "business-enquiry", label: "Business Enquiry", icon: Briefcase },
          { id: "footer", label: "Footer Settings", icon: Globe },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${isActive
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ACTIVE TAB VIEW */}
      <div className="w-full">

        {/* ===== SECTION VISIBILITY TAB ===== */}
        {activeTab === "visibility" && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <ToggleRight className="w-5 h-5 text-red-500" />
                  Homepage Section Visibility
                </h2>
                <p className="text-zinc-400 text-sm mt-1">Toggle each section on or off. Disabled sections will be completely hidden from visitors.</p>
              </div>

              <div className="space-y-3">
                {([
                  { key: "hero", label: "Hero / Banner Slider", desc: "The main hero section with rotating banners" },
                  { key: "trustTicker", label: "Trust Ticker Bar", desc: "The scrolling stats bar (50K+ Customers, etc.)" },
                  { key: "dealOfTheDay", label: "Deal of the Day", desc: "Flash sale countdown with a featured product deal" },
                  { key: "shopByGoal", label: "Shop by Goal", desc: "Goal-based product browsing section" },
                  { key: "featuredProducts", label: "Featured Products", desc: "Featured product stack cards" },
                  { key: "realReviews", label: "Real People. Real Reviews", desc: "Customer review cards section" },
                  { key: "whyChooseUs", label: "Why Choose Us", desc: "Brand benefit cards section" },
                  { key: "brandFilm", label: "Brand Film / The Standard", desc: "Video teaser section with brand story" },
                  { key: "bestSellers", label: "Best Sellers", desc: "Top-selling product cards" },
                  { key: "blogs", label: "Blog Section", desc: "Latest blog articles preview" },
                  { key: "news", label: "News / Press Section", desc: "Latest press releases and news cards" },
                ] as { key: string; label: string; desc: string }[]).map(({ key, label, desc }) => {
                  const isOn = sectionVisibility[key] !== false;
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between gap-4 rounded-2xl p-4 border transition-all ${
                        isOn ? "bg-black/30 border-white/10" : "bg-black/10 border-white/5 opacity-60"
                      }`}
                    >
                      <div>
                        <p className="text-white font-bold text-sm">{label}</p>
                        <p className="text-zinc-500 text-xs mt-0.5">{desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSectionVisibility((prev) => ({ ...prev, [key]: !isOn }))
                        }
                        className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                          isOn ? "bg-red-600 border-red-600" : "bg-zinc-700 border-zinc-700"
                        }`}
                        aria-label={`Toggle ${label}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
                            isOn ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSectionVisibility}
                  disabled={savingSectionVisibility}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingSectionVisibility ? "Saving..." : "Save Visibility Settings"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flash" && (
          <div className="space-y-8 max-w-3xl">

            {/* Website Logo Settings */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
              <form onSubmit={handleSaveLogo} className="space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Image className="w-5 h-5 text-red-500" />
                  Website Logo Settings
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    Website Name
                  </label>
                  <input
                    type="text"
                    required
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    placeholder="e.g. Muscleyn"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Upload Website Logo</label>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                      {uploadingLogo ? (
                        <span className="animate-pulse">Uploading...</span>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Choose Logo File
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadLogo}
                        disabled={uploadingLogo}
                      />
                    </label>
                    {logoUrl && (
                      <div className="relative group">
                        <img
                          src={logoUrl}
                          alt="Logo preview"
                          className="h-12 max-w-40 object-contain rounded-xl border border-white/10 bg-black/40 p-2"
                        />
                        <button
                          type="button"
                          onClick={() => setLogoUrl("")}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {!logoUrl && (
                      <span className="text-zinc-600 text-xs italic">No logo uploaded (falls back to default brand typography)</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingLogo || uploadingLogo}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingLogo ? "Saving Logo..." : "Save Website Logo"}
                  </button>
                </div>
              </form>
            </div>

            {/* Homepage Trust Ticker Settings */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
              <form onSubmit={handleSaveTrustTicker} className="space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Homepage Trust Ticker Settings
                </h2>

                <div className="space-y-4">
                  {/* List of items */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                      Active Ticker Statements
                    </label>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {trustTickerList.length === 0 ? (
                        <p className="text-zinc-500 text-sm font-medium py-2">No ticker items added yet. Click Add Item below.</p>
                      ) : (
                        trustTickerList.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5 group">
                            <span className="text-sm font-medium text-white">{item}</span>
                            <button
                              type="button"
                              onClick={() => setTrustTickerList(trustTickerList.filter((_, i) => i !== idx))}
                              className="text-zinc-500 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add item */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTickerItem}
                      onChange={(e) => setNewTickerItem(e.target.value)}
                      placeholder="Add statement, e.g. 50K+ Customers"
                      className="flex-1 bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newTickerItem.trim()) {
                            setTrustTickerList([...trustTickerList, newTickerItem.trim()]);
                            setNewTickerItem("");
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newTickerItem.trim()) {
                          setTrustTickerList([...trustTickerList, newTickerItem.trim()]);
                          setNewTickerItem("");
                        }
                      }}
                      className="bg-zinc-800 hover:bg-white hover:text-black text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingTrustTicker}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingTrustTicker ? "Saving..." : "Save Ticker List"}
                  </button>
                </div>
              </form>
            </div>

            {/* Homepage Hero Carousel Banners */}
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                <Image className="w-5 h-5 text-red-500" />
                Homepage Hero Carousel Banners
              </h2>

              {/* Add / Edit Form */}
              <form onSubmit={handleSaveBanner} className="space-y-5 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                  {editingBannerId !== null ? "✏️ Edit Banner" : "➕ Add New Banner"}
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Banner Title</label>
                  <input
                    type="text"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    placeholder="e.g. Summer Sale – Up to 50% Off"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                {/* Eyebrow Label */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Eyebrow Label <span className="text-zinc-600 normal-case font-normal">(small tag above title)</span></label>
                  <input
                    type="text"
                    value={bannerEyebrow}
                    onChange={(e) => setBannerEyebrow(e.target.value)}
                    placeholder="e.g. EXCLUSIVE ANNOUNCEMENT"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Subtitle / Description <span className="text-zinc-600 normal-case font-normal">(shown below title)</span></label>
                  <textarea
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    placeholder="e.g. Formulated for performance, clinically tested, and athlete approved."
                    rows={2}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Banner Image</label>
                  <div className="flex gap-3 items-center">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                      {uploadingBannerImage ? (
                        <span className="animate-pulse">Uploading...</span>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadBannerImage}
                        disabled={uploadingBannerImage}
                      />
                    </label>
                    {bannerImageUrl && (
                      <div className="relative group">
                        <img
                          src={bannerImageUrl}
                          alt="Banner preview"
                          className="h-16 w-28 object-cover rounded-xl border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setBannerImageUrl("")}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {!bannerImageUrl && (
                      <span className="text-zinc-600 text-xs italic">No image selected</span>
                    )}
                  </div>
                </div>

                {/* Redirect URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Redirect URL</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={bannerRedirectUrl}
                      onChange={(e) => setBannerRedirectUrl(e.target.value)}
                      placeholder="/shop"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl pl-9 pr-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Sort Order + Active */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={bannerSortOrder}
                      onChange={(e) => setBannerSortOrder(Number(e.target.value))}
                      min={0}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Status</label>
                    <button
                      type="button"
                      onClick={() => setBannerIsActive(!bannerIsActive)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all w-full ${
                        bannerIsActive
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-zinc-800 border-white/10 text-zinc-400"
                      }`}
                    >
                      {bannerIsActive ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                      {bannerIsActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={savingBanner || uploadingBannerImage}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingBanner ? "Saving..." : editingBannerId !== null ? "Update Banner" : "Add Banner"}
                  </button>
                  {editingBannerId !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBannerId(null);
                        setBannerTitle("");
                        setBannerEyebrow("");
                        setBannerSubtitle("");
                        setBannerImageUrl("");
                        setBannerRedirectUrl("/shop");
                        setBannerSortOrder(0);
                        setBannerIsActive(true);
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/10 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Banners List */}
              {bannersList.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                  <Image className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm font-medium">No banners added yet.</p>
                  <p className="text-zinc-600 text-xs mt-1">Use the form above to create your first homepage banner.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                    {bannersList.length} Banner{bannersList.length !== 1 ? "s" : ""} Configured
                  </p>
                  {[...bannersList].sort((a, b) => a.sortOrder - b.sortOrder).map((banner: any) => (
                    <div
                      key={banner.id}
                      className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-4 group hover:border-white/15 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        {banner.imageUrl ? (
                          <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-24 h-14 object-cover rounded-xl border border-white/10"
                          />
                        ) : (
                          <div className="w-24 h-14 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center">
                            <Image className="w-5 h-5 text-zinc-600" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{banner.title || "Untitled Banner"}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 truncate flex items-center gap-1">
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          {banner.redirectUrl || "/"}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full border border-white/5">
                            Order: {banner.sortOrder ?? 0}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            banner.isActive
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : "bg-zinc-800 border-white/10 text-zinc-500"
                          }`}>
                            {banner.isActive ? "● Active" : "○ Inactive"}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBannerId(banner.id);
                            setBannerTitle(banner.title || "");
                            setBannerEyebrow(banner.eyebrow || "");
                            setBannerSubtitle(banner.subtitle || "");
                            setBannerImageUrl(banner.imageUrl || "");
                            setBannerRedirectUrl(banner.redirectUrl || "/shop");
                            setBannerSortOrder(banner.sortOrder ?? 0);
                            setBannerIsActive(banner.isActive ?? true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-white hover:text-black text-white border border-white/10 transition-all cursor-pointer"
                          title="Edit banner"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-2 rounded-xl bg-red-900/30 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                          title="Delete banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GOALS TAB */}
        {activeTab === "goals" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-fit">
              <form onSubmit={handleAddOrEditGoal} className="space-y-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  {editingGoalIdx !== null ? "Edit Goal Card" : "Add Goal Card"}
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Goal Title</label>
                  <input
                    type="text"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder="E.g., Muscle Gain"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Goal Description</label>
                  <textarea
                    value={goalCopy}
                    onChange={(e) => setGoalCopy(e.target.value)}
                    placeholder="E.g., Heavy calorie stacks for lean bulking"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Goal Image</label>
                  <div className="flex gap-3 items-center">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                      {uploadingGoalImage ? (
                        <span className="animate-pulse">Uploading...</span>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadGoalImage}
                        disabled={uploadingGoalImage}
                      />
                    </label>
                    {goalImg && (
                      <div className="relative group">
                        <img
                          src={goalImg}
                          alt="Goal preview"
                          className="h-16 w-16 object-cover rounded-xl border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setGoalImg("")}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity animate-none"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {!goalImg && (
                      <span className="text-zinc-600 text-xs italic">No image selected</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  {editingGoalIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingGoalIdx(null);
                        setGoalTitle("");
                        setGoalCopy("");
                        setGoalImg("");
                      }}
                      className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-wider border border-white/5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {editingGoalIdx !== null ? "Update Card" : "Add Card"}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-red-500" />
                    Active Homepage Goals
                  </h2>
                  <span className="text-xs font-bold text-zinc-500 uppercase">{goalsList.length} Goals configured</span>
                </div>

                {goalsList.length === 0 ? (
                  <div className="text-center py-16 text-zinc-500 font-medium">
                    No custom goal cards configured. Renders default goals (Muscle Gain, Fat Loss, Recovery).
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalsList.map((item, idx) => (
                      <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex gap-4 items-center group relative hover:border-red-500/20 transition-all">
                        {item.img && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-white truncate">{item.title}</h4>
                          <p className="text-zinc-400 text-xs mt-1 font-medium line-clamp-2">{item.copy}</p>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleStartEditGoal(idx)}
                            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                            title="Edit Card"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteGoal(idx)}
                            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                            title="Delete Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-5 mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveGoals}
                  disabled={savingGoals}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingGoals ? "Saving..." : "Save Active Goals to Database"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-fit">
              <form onSubmit={handleAddOrEditBlog} className="space-y-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  {editingBlogIdx !== null ? "Edit Blog Post" : "Add Blog Post"}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Category Tag</label>
                    <input
                      type="text"
                      value={blogTag}
                      onChange={(e) => setBlogTag(e.target.value)}
                      placeholder="E.g., Nutrition"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Tag Subtitle</label>
                    <input
                      type="text"
                      value={blogTagSub}
                      onChange={(e) => setBlogTagSub(e.target.value)}
                      placeholder="E.g., High-Protein Meals"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Author</label>
                    <input
                      type="text"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      placeholder="E.g., Dr. Manish Kumar"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Read Time</label>
                    <input
                      type="text"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      placeholder="5 min read"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Publish Date</label>
                    <input
                      type="text"
                      value={blogDate}
                      onChange={(e) => setBlogDate(e.target.value)}
                      placeholder="November 28, 2024"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Blog Featured Image</label>
                    {blogImage ? (
                      <div className="relative h-[42px] rounded-xl overflow-hidden border border-white/10 group bg-zinc-900 flex items-center justify-between px-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={blogImage} alt="Featured Preview" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                          <span className="text-zinc-400 text-[10px] truncate font-bold uppercase tracking-wider">{blogImage.split('/').pop()}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setBlogImage("")}
                          className="text-zinc-500 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                          title="Remove Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border border-dashed border-white/25 hover:border-red-500/50 hover:bg-red-500/[0.02] rounded-xl h-[42px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300">
                        {uploadingBlogImage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/10 border-t-red-500 rounded-full animate-spin" />
                            <span className="text-zinc-500 text-[10px] font-medium uppercase tracking-wider">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Upload Image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadMainBlogImage}
                          className="hidden"
                          disabled={uploadingBlogImage}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Blog Title</label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter blog headline"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Brief Summary</label>
                  <textarea
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    placeholder="Short summary for the index catalog list..."
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Blog Full Content</label>
                  <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Type the full blog post body here..."
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors font-medium"
                    rows={6}
                  />
                </div>

                {/* Multiple Images / Gallery */}
                <div className="border border-white/10 rounded-2xl p-4 bg-black/20">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Blog Gallery / Multiple Images
                    </span>
                    <label className="text-[10px] font-black text-red-500 hover:text-white uppercase flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer">
                      {uploadingBlogGallery ? (
                        <div className="w-3.5 h-3.5 border-2 border-red-500/10 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      <span>Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadBlogGalleryImage}
                        className="hidden"
                        disabled={uploadingBlogGallery}
                      />
                    </label>
                  </div>

                  {blogImages.length === 0 ? (
                    <div className="text-center py-6 text-zinc-600 text-xs font-medium">
                      No gallery images uploaded yet. Use "+ Add Image" to add slides.
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {blogImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group bg-zinc-900">
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setBlogImages(blogImages.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200"
                            title="Remove Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  {editingBlogIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlogIdx(null);
                        setBlogTag("");
                        setBlogTagSub("");
                        setBlogDate("");
                        setBlogAuthor("");
                        setBlogReadTime("");
                        setBlogTitle("");
                        setBlogSummary("");
                        setBlogContent("");
                        setBlogImage("");
                        setBlogImages([]);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-wider border border-white/5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {editingBlogIdx !== null ? "Update Blog" : "Add Blog"}
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    Active Blog Posts
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowHeaderEdit(!showHeaderEdit)}
                      className="text-[10px] font-black text-zinc-400 hover:text-white uppercase flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/10 transition cursor-pointer"
                    >
                      <Pencil className="w-3 h-3 text-red-500" />
                      Page Header
                    </button>
                    <span className="text-xs font-bold text-zinc-500 uppercase">{blogsList.length} Posts</span>
                  </div>
                </div>

                {showHeaderEdit && (
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                        <Settings className="w-3 h-3 text-red-500" />
                        Blogs Page Header Settings
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Page Title</label>
                        <input
                          type="text"
                          value={blogsHeaderTitle}
                          onChange={(e) => setBlogsHeaderTitle(e.target.value)}
                          placeholder="E.g., Our Blogs"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Page Subtitle / Description</label>
                        <input
                          type="text"
                          value={blogsHeaderSubtitle}
                          onChange={(e) => setBlogsHeaderSubtitle(e.target.value)}
                          placeholder="E.g., Science-backed articles..."
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleSaveBlogsHeader}
                        disabled={savingBlogsHeader}
                        className="bg-red-600 hover:bg-white hover:text-black text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold transition-all text-[9px] uppercase tracking-wider border border-white/5 disabled:opacity-50 cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        {savingBlogsHeader ? "Saving..." : "Save Header"}
                      </button>
                    </div>
                  </div>
                )}

                {blogsList.length === 0 ? (
                  <div className="text-center py-16 text-zinc-500 font-medium">
                    No custom blog posts configured. Rendering default insights.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogsList.map((post, idx) => (
                      <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex gap-4 items-center group relative hover:border-red-500/20 transition-all">
                        {post.image && (
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{post.tag}</span>
                          <h4 className="text-sm font-black text-white truncate mt-0.5">{post.title}</h4>
                          <p className="text-zinc-400 text-xs mt-1 font-medium line-clamp-1">{post.summary}</p>
                          <span className="text-[10px] text-zinc-500 font-bold block mt-1 uppercase tracking-wider">{post.author} • {post.date}</span>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleStartEditBlog(idx)}
                            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                            title="Edit Blog"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(idx)}
                            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-5 mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveBlogs}
                  disabled={savingBlogs}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingBlogs ? "Saving..." : "Save Blog list to Database"}
                </button>
              </div>
            </div>
          </div>
        )
        }

        {/* NEWS TAB */}
        {
          activeTab === "news" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-fit">
                <form onSubmit={handleAddOrEditNews} className="space-y-4">
                  <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Globe className="w-5 h-5 text-red-500" />
                    {editingNewsIdx !== null ? "Edit News Article" : "Add News Article"}
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Publisher Name</label>
                      <input
                        type="text"
                        value={newsPublisher}
                        onChange={(e) => setNewsPublisher(e.target.value)}
                        placeholder="E.g., ET Brand Equity"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Publisher Date</label>
                      <input
                        type="text"
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        placeholder="June 15, 2026"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Icon Type</label>
                    <select
                      value={newsIcon}
                      onChange={(e) => setNewsIcon(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                    >
                      <option value="Newspaper" className="bg-zinc-900 text-white">Newspaper</option>
                      <option value="Award" className="bg-zinc-900 text-white">Award</option>
                      <option value="TrendingUp" className="bg-zinc-900 text-white">TrendingUp</option>
                      <option value="Star" className="bg-zinc-900 text-white">Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">News Headline</label>
                    <input
                      type="text"
                      value={newsHeadline}
                      onChange={(e) => setNewsHeadline(e.target.value)}
                      placeholder="Enter headline"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Brief Summary</label>
                    <textarea
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="Short summary for the index catalog list..."
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">News Detail Copy</label>
                    <textarea
                      value={newsDetail}
                      onChange={(e) => setNewsDetail(e.target.value)}
                      placeholder="Type the full news description/article details here..."
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-xs transition-colors font-medium"
                      rows={6}
                    />
                  </div>

                  {/* Multiple Images / Gallery */}
                  <div className="border border-white/10 rounded-2xl p-4 bg-black/20">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        News Gallery / Multiple Images
                      </span>
                      <label className="text-[10px] font-black text-red-500 hover:text-white uppercase flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer">
                        {uploadingNewsGallery ? (
                          <div className="w-3.5 h-3.5 border-2 border-red-500/10 border-t-red-500 rounded-full animate-spin" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                        <span>Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadNewsGalleryImage}
                          className="hidden"
                          disabled={uploadingNewsGallery}
                        />
                      </label>
                    </div>

                    {newsImages.length === 0 ? (
                      <div className="text-center py-6 text-zinc-600 text-xs font-medium">
                        No news gallery images uploaded yet. Use "+ Add Image" to add slides.
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {newsImages.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group bg-zinc-900">
                            <img src={imgUrl} alt={`News Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setNewsImages(newsImages.filter((_, i) => i !== idx))}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200"
                              title="Remove Image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    {editingNewsIdx !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNewsIdx(null);
                          setNewsPublisher("");
                          setNewsDate("");
                          setNewsHeadline("");
                          setNewsSummary("");
                          setNewsDetail("");
                          setNewsIcon("Newspaper");
                          setNewsImages([]);
                        }}
                        className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-wider border border-white/5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      {editingNewsIdx !== null ? "Update News" : "Add News"}
                    </button>
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-red-500" />
                      Active News Publications
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowNewsHeaderEdit(!showNewsHeaderEdit)}
                        className="text-[10px] font-black text-zinc-400 hover:text-white uppercase flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/10 transition cursor-pointer"
                      >
                        <Pencil className="w-3 h-3 text-red-500" />
                        Page Header
                      </button>
                      <span className="text-xs font-bold text-zinc-500 uppercase">{newsList.length} Publications</span>
                    </div>
                  </div>

                  {showNewsHeaderEdit && (
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                          <Settings className="w-3 h-3 text-red-500" />
                          News Page Header Settings
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Page Title</label>
                          <input
                            type="text"
                            value={newsHeaderTitle}
                            onChange={(e) => setNewsHeaderTitle(e.target.value)}
                            placeholder=""
                            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Page Subtitle / Description</label>
                          <input
                            type="text"
                            value={newsHeaderSubtitle}
                            onChange={(e) => setNewsHeaderSubtitle(e.target.value)}
                            placeholder="E.g., Media features, announcements..."
                            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={handleSaveNewsHeader}
                          disabled={savingNewsHeader}
                          className="bg-red-600 hover:bg-white hover:text-black text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold transition-all text-[9px] uppercase tracking-wider border border-white/5 disabled:opacity-50 cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          {savingNewsHeader ? "Saving..." : "Save Header"}
                        </button>
                      </div>
                    </div>
                  )}

                  {newsList.length === 0 ? (
                    <div className="text-center py-16 text-zinc-500 font-medium">
                      No custom news coverage configured. Rendering default articles.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {newsList.map((art, idx) => (
                        <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex gap-4 items-center group relative hover:border-red-500/20 transition-all">
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-red-500">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{art.publisher}</span>
                            <h4 className="text-sm font-black text-white truncate mt-0.5">{art.headline}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-medium line-clamp-1">{art.summary}</p>
                            <span className="text-[10px] text-zinc-500 font-bold block mt-1 uppercase tracking-wider">{art.date} • Icon: {art.icon}</span>
                          </div>
                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleStartEditNews(idx)}
                              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                              title="Edit News"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteNews(idx)}
                              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/5 transition-colors cursor-pointer"
                              title="Delete News"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/5 pt-5 mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveNews}
                    disabled={savingNews}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingNews ? "Saving..." : "Save News list to Database"}
                  </button>
                </div>
              </div>
            </div>
          )
        }

        {
          activeTab === "terms" && (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full">
              <form onSubmit={handleSaveTerms} className="space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  Terms & Conditions Copy
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Terms Page Content
                  </label>
                  <textarea
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="Enter detailed Terms and Conditions of the store..."
                    rows={15}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl p-4 outline-none text-white text-sm font-medium transition-colors"
                  />
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingTerms}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingTerms ? "Saving..." : "Save Terms Copy"}
                  </button>
                </div>
              </form>
            </div>
          )
        }

        {
          activeTab === "privacy" && (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full">
              <form onSubmit={handleSavePrivacy} className="space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Privacy Policy Copy
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Privacy Page Content
                  </label>
                  <textarea
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    placeholder="Enter detailed Privacy Policy of the store..."
                    rows={15}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl p-4 outline-none text-white text-sm font-medium transition-colors"
                  />
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingPrivacy}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingPrivacy ? "Saving..." : "Save Privacy Copy"}
                  </button>
                </div>
              </form>
            </div>
          )
        }

        {
          activeTab === "contact" && (
            <div className="space-y-12 w-full">
              {/* SECTION 1: HEADER & HERO */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full">
                <form onSubmit={handleSaveContactHeader} className="space-y-6">
                  <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Globe className="w-5 h-5 text-red-500" />
                    Contact Page Hero Header Settings
                  </h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={contactHeaderEyebrow}
                        onChange={(e) => setContactHeaderEyebrow(e.target.value)}
                        placeholder="E.g., Contact Us"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        Background Image
                      </label>
                      <div className="flex gap-3 items-center">
                        <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                          {uploadingContactBg ? (
                            <span className="animate-pulse">Uploading...</span>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Choose Image
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadContactBgImage}
                            disabled={uploadingContactBg}
                          />
                        </label>
                        {contactHeaderBgImage && (
                          <div className="relative group">
                            <img
                              src={contactHeaderBgImage}
                              alt="Background preview"
                              className="h-16 w-28 object-cover rounded-xl border border-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => setContactHeaderBgImage("")}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {!contactHeaderBgImage && (
                          <span className="text-zinc-600 text-xs italic">No image selected</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={contactHeaderTitle}
                        onChange={(e) => setContactHeaderTitle(e.target.value)}
                        placeholder="E.g., Need help with products, orders, or your stack?"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        WhatsApp Number (e.g. 919876543210)
                      </label>
                      <input
                        type="text"
                        value={contactWhatsapp}
                        onChange={(e) => setContactWhatsapp(e.target.value)}
                        placeholder="E.g., 919876543210"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      value={contactHeaderSubtitle}
                      onChange={(e) => setContactHeaderSubtitle(e.target.value)}
                      placeholder="Detailed contact description..."
                      rows={3}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div className="border-t border-white/5 pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingContactHeader}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingContactHeader ? "Saving..." : "Save Header Settings"}
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION 2: STORE LOCATIONS */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full space-y-8">
                <div className="border-b border-white/5 pb-3">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    Store Locations (Experience Centers)
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Current Stores List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Stores</h3>
                    <div className="space-y-3">
                      {contactStores.length === 0 ? (
                        <p className="text-zinc-500 text-sm font-medium">No store locations added yet.</p>
                      ) : (
                        contactStores.map((store, idx) => (
                          <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-start justify-between gap-4 group">
                            <div className="space-y-1">
                              <h4 className="text-white font-black text-base">{store.name}</h4>
                              <p className="text-zinc-400 text-xs font-medium">{store.address}</p>
                              <p className="text-zinc-500 text-xs font-medium"><span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Timings:</span> {store.timings}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingStoreIdx(idx);
                                  setNewStoreId(store.id || "");
                                  setNewStoreName(store.name || "");
                                  setNewStoreAddress(store.address || "");
                                  setNewStoreTimings(store.timings || "");
                                  setNewStoreMapUrl(store.mapUrl || "");
                                  setNewStoreDirectionsUrl(store.directionsUrl || "");
                                }}
                                className="text-zinc-400 hover:text-white p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = contactStores.filter((_, i) => i !== idx);
                                  setContactStores(updated);
                                  if (editingStoreIdx === idx) {
                                    setEditingStoreIdx(null);
                                    setNewStoreId("");
                                    setNewStoreName("");
                                    setNewStoreAddress("");
                                    setNewStoreTimings("");
                                    setNewStoreMapUrl("");
                                    setNewStoreDirectionsUrl("");
                                  }
                                  toast.success("Location removed from local list.");
                                }}
                                className="text-zinc-500 hover:text-red-500 p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add/Edit Store Form */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-black text-white">
                      {editingStoreIdx !== null ? "Edit Store Location" : "Add Store Location"}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Store ID (lowercase unique)</span>
                        <input
                          type="text"
                          value={newStoreId}
                          onChange={(e) => setNewStoreId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          placeholder="e.g. indore-hq"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Store Name</span>
                        <input
                          type="text"
                          value={newStoreName}
                          onChange={(e) => setNewStoreName(e.target.value)}
                          placeholder="e.g. Muscleyn Indore HQ"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Store Address</span>
                        <input
                          type="text"
                          value={newStoreAddress}
                          onChange={(e) => setNewStoreAddress(e.target.value)}
                          placeholder="e.g. Vijay Nagar, Indore"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Support/Pickup Timings</span>
                        <input
                          type="text"
                          value={newStoreTimings}
                          onChange={(e) => setNewStoreTimings(e.target.value)}
                          placeholder="e.g. Mon-Sat, 10 AM - 7 PM"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Google Maps Embed URL</span>
                        <input
                          type="text"
                          value={newStoreMapUrl}
                          onChange={(e) => setNewStoreMapUrl(e.target.value)}
                          placeholder="Embed URL (from share map iframe src)"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Directions Link URL</span>
                        <input
                          type="text"
                          value={newStoreDirectionsUrl}
                          onChange={(e) => setNewStoreDirectionsUrl(e.target.value)}
                          placeholder="Directions Google Maps page link"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        {editingStoreIdx !== null ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newStoreId || !newStoreName || !newStoreAddress) {
                                  toast.error("Please fill required fields");
                                  return;
                                }
                                const updated = [...contactStores];
                                updated[editingStoreIdx] = {
                                  id: newStoreId,
                                  name: newStoreName,
                                  address: newStoreAddress,
                                  timings: newStoreTimings,
                                  mapUrl: newStoreMapUrl,
                                  directionsUrl: newStoreDirectionsUrl
                                };
                                setContactStores(updated);
                                setEditingStoreIdx(null);
                                setNewStoreId("");
                                setNewStoreName("");
                                setNewStoreAddress("");
                                setNewStoreTimings("");
                                setNewStoreMapUrl("");
                                setNewStoreDirectionsUrl("");
                                toast.success("Store info updated locally!");
                              }}
                              className="flex-1 bg-red-600 hover:bg-white hover:text-black text-white py-2 rounded-xl text-xs font-bold uppercase transition"
                            >
                              Update Store
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingStoreIdx(null);
                                setNewStoreId("");
                                setNewStoreName("");
                                setNewStoreAddress("");
                                setNewStoreTimings("");
                                setNewStoreMapUrl("");
                                setNewStoreDirectionsUrl("");
                              }}
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-xl text-xs font-bold uppercase transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (!newStoreId || !newStoreName || !newStoreAddress) {
                                toast.error("Store ID, Name, and Address are required");
                                return;
                              }
                              setContactStores([
                                ...contactStores,
                                {
                                  id: newStoreId,
                                  name: newStoreName,
                                  address: newStoreAddress,
                                  timings: newStoreTimings,
                                  mapUrl: newStoreMapUrl,
                                  directionsUrl: newStoreDirectionsUrl
                                }
                              ]);
                              setNewStoreId("");
                              setNewStoreName("");
                              setNewStoreAddress("");
                              setNewStoreTimings("");
                              setNewStoreMapUrl("");
                              setNewStoreDirectionsUrl("");
                              toast.success("New store location added locally!");
                            }}
                            className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-2 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Store
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <p className="text-zinc-500 text-xs font-medium">Don't forget to save changes to DB after adding or editing stores.</p>
                  <button
                    type="button"
                    onClick={handleSaveContactStores}
                    disabled={savingContactStores}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingContactStores ? "Saving..." : "Save Store Locations"}
                  </button>
                </div>
              </div>

              {/* SECTION 3: FAQS */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full space-y-8">
                <div className="border-b border-white/5 pb-3">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    Frequently Asked Questions (FAQs)
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Current FAQs List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active FAQs</h3>
                    <div className="space-y-3">
                      {contactFaqs.length === 0 ? (
                        <p className="text-zinc-500 text-sm font-medium">No FAQs added yet.</p>
                      ) : (
                        contactFaqs.map((faq, idx) => (
                          <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-start justify-between gap-4 group">
                            <div className="flex-1">
                              <h4 className="text-white font-black text-sm">Q: {faq.question}</h4>
                              <p className="text-zinc-400 text-xs mt-2 font-medium leading-relaxed">A: {faq.answer}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingFaqIdx(idx);
                                  setNewFaqQuestion(faq.question || "");
                                  setNewFaqAnswer(faq.answer || "");
                                }}
                                className="text-zinc-400 hover:text-white p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = contactFaqs.filter((_, i) => i !== idx);
                                  setContactFaqs(updated);
                                  if (editingFaqIdx === idx) {
                                    setEditingFaqIdx(null);
                                    setNewFaqQuestion("");
                                    setNewFaqAnswer("");
                                  }
                                  toast.success("FAQ removed locally.");
                                }}
                                className="text-zinc-500 hover:text-red-500 p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add/Edit FAQ Form */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-black text-white">
                      {editingFaqIdx !== null ? "Edit FAQ" : "Add FAQ"}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Question</span>
                        <input
                          type="text"
                          value={newFaqQuestion}
                          onChange={(e) => setNewFaqQuestion(e.target.value)}
                          placeholder="e.g. How do I track my shipment?"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Answer</span>
                        <textarea
                          value={newFaqAnswer}
                          onChange={(e) => setNewFaqAnswer(e.target.value)}
                          placeholder="Answer details..."
                          rows={4}
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        {editingFaqIdx !== null ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newFaqQuestion || !newFaqAnswer) {
                                  toast.error("Question and answer are required");
                                  return;
                                }
                                const updated = [...contactFaqs];
                                updated[editingFaqIdx] = {
                                  question: newFaqQuestion,
                                  answer: newFaqAnswer
                                };
                                setContactFaqs(updated);
                                setEditingFaqIdx(null);
                                setNewFaqQuestion("");
                                setNewFaqAnswer("");
                                toast.success("FAQ updated locally!");
                              }}
                              className="flex-1 bg-red-600 hover:bg-white hover:text-black text-white py-2 rounded-xl text-xs font-bold uppercase transition"
                            >
                              Update FAQ
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFaqIdx(null);
                                setNewFaqQuestion("");
                                setNewFaqAnswer("");
                              }}
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-xl text-xs font-bold uppercase transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (!newFaqQuestion || !newFaqAnswer) {
                                toast.error("Question and answer are required");
                                return;
                              }
                              setContactFaqs([
                                ...contactFaqs,
                                {
                                  question: newFaqQuestion,
                                  answer: newFaqAnswer
                                }
                              ]);
                              setNewFaqQuestion("");
                              setNewFaqAnswer("");
                              toast.success("FAQ added locally!");
                            }}
                            className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-2 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add FAQ
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <p className="text-zinc-500 text-xs font-medium">Don't forget to save changes to DB after adding or editing FAQs.</p>
                  <button
                    type="button"
                    onClick={handleSaveContactFaqs}
                    disabled={savingContactFaqs}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingContactFaqs ? "Saving..." : "Save FAQs"}
                  </button>
                </div>
              </div>

              {/* SECTION 4: CONTACT INFO CARDS */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full space-y-8">
                <div className="border-b border-white/5 pb-3">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-500" />
                    Contact Info Cards Settings
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Current List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Info Cards</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {contactInfoCards.map((card, idx) => (
                        <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-start justify-between gap-4 group">
                          <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full inline-block mb-2">
                              {card.icon}
                            </span>
                            <h4 className="text-white font-black text-sm">{card.title}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-medium">{card.value}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setContactInfoCards(contactInfoCards.filter((_, i) => i !== idx));
                              toast.success("Card removed locally.");
                            }}
                            className="text-zinc-500 hover:text-red-500 p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Form */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-black text-white">Add Contact Info Card</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Select Icon</span>
                        <select
                          value={newInfoIcon}
                          onChange={(e) => setNewInfoIcon(e.target.value)}
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        >
                          <option value="Phone">Phone (Telephone icon)</option>
                          <option value="Mail">Mail (Email letter icon)</option>
                          <option value="MapPin">MapPin (Address pin icon)</option>
                          <option value="Clock">Clock (Support Hours clock icon)</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Card Title</span>
                        <input
                          type="text"
                          value={newInfoTitle}
                          onChange={(e) => setNewInfoTitle(e.target.value)}
                          placeholder="e.g. Phone"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Card Value</span>
                        <input
                          type="text"
                          value={newInfoValue}
                          onChange={(e) => setNewInfoValue(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newInfoTitle || !newInfoValue) {
                            toast.error("Title and Value are required");
                            return;
                          }
                          setContactInfoCards([
                            ...contactInfoCards,
                            { icon: newInfoIcon, title: newInfoTitle, value: newInfoValue }
                          ]);
                          setNewInfoTitle("");
                          setNewInfoValue("");
                          toast.success("Card added locally!");
                        }}
                        className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-2.5 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-1 pt-3"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Info Card
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <p className="text-zinc-500 text-xs font-medium">Click save below to submit contact info cards changes to DB.</p>
                  <button
                    type="button"
                    onClick={handleSaveContactInfoCards}
                    disabled={savingContactInfoCards}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingContactInfoCards ? "Saving..." : "Save Info Cards"}
                  </button>
                </div>
              </div>

              {/* SECTION 5: SUPPORT GUIDANCE CARDS */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full space-y-8">
                <div className="border-b border-white/5 pb-3">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-red-500" />
                    Support/Guidance Cards Settings
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Current List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Support Cards</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {contactSupportCards.map((card, idx) => (
                        <div key={idx} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-start justify-between gap-4 group">
                          <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full inline-block mb-2">
                              {card.icon}
                            </span>
                            <h4 className="text-white font-black text-sm">{card.title}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-medium">{card.copy}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setContactSupportCards(contactSupportCards.filter((_, i) => i !== idx));
                              toast.success("Support card removed locally.");
                            }}
                            className="text-zinc-500 hover:text-red-500 p-2 bg-white/5 rounded-xl border border-white/10 transition cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Form */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-black text-white">Add Support Card</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Select Icon</span>
                        <select
                          value={newSupportIcon}
                          onChange={(e) => setNewSupportIcon(e.target.value)}
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        >
                          <option value="Headphones">Headphones (Support headset)</option>
                          <option value="MessageCircle">MessageCircle (Chat bubble)</option>
                          <option value="Send">Send (Paper plane / social link)</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Card Title</span>
                        <input
                          type="text"
                          value={newSupportTitle}
                          onChange={(e) => setNewSupportTitle(e.target.value)}
                          placeholder="e.g. Order Support"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Card Copy / Description</span>
                        <input
                          type="text"
                          value={newSupportCopy}
                          onChange={(e) => setNewSupportCopy(e.target.value)}
                          placeholder="e.g. Delivery, payment, returns"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newSupportTitle || !newSupportCopy) {
                            toast.error("Title and Copy are required");
                            return;
                          }
                          setContactSupportCards([
                            ...contactSupportCards,
                            { icon: newSupportIcon, title: newSupportTitle, copy: newSupportCopy }
                          ]);
                          setNewSupportTitle("");
                          setNewSupportCopy("");
                          toast.success("Support card added locally!");
                        }}
                        className="w-full bg-red-600 hover:bg-white hover:text-black text-white py-2.5 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-1 pt-3"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Support Card
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                  <p className="text-zinc-500 text-xs font-medium">Click save below to submit support cards changes to DB.</p>
                  <button
                    type="button"
                    onClick={handleSaveContactSupportCards}
                    disabled={savingContactSupportCards}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingContactSupportCards ? "Saving..." : "Save Support Cards"}
                  </button>
                </div>
              </div>
            </div>
          )
        }

        {
          activeTab === "return" && (
            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl w-full">
              <form onSubmit={handleSaveReturnPolicy} className="space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  Return & Refund Policy Copy
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Return & Refund Policy Content (Supports HTML)
                  </label>
                  <textarea
                    value={returnPolicy}
                    onChange={(e) => setReturnPolicy(e.target.value)}
                    placeholder="Enter detailed Return and Refund Policy of the store..."
                    rows={15}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl p-4 outline-none text-white text-sm font-medium transition-colors"
                  />
                </div>

                <div className="border-t border-white/5 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingReturnPolicy}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingReturnPolicy ? "Saving..." : "Save Return & Refund Policy"}
                  </button>
                </div>
              </form>
            </div>
          )
        }

        {
          activeTab === "authenticity" && (
            <div className="space-y-8 max-w-3xl w-full">
              {/* Authenticity Hero Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                <form onSubmit={handleSaveAuthHero} className="space-y-6">
                  <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                    Authenticity Hero Settings
                  </h2>

                  {/* Eyebrow / Tagline */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Eyebrow Tagline
                    </label>
                    <input
                      type="text"
                      value={authTagline}
                      onChange={(e) => setAuthTagline(e.target.value)}
                      placeholder="e.g. Authenticity & Testing"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={authSubtitle}
                      onChange={(e) => setAuthSubtitle(e.target.value)}
                      placeholder="e.g. Manufactured In"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={authTitle}
                      onChange={(e) => setAuthTitle(e.target.value)}
                      placeholder="e.g. WORLD CLASS FACILITY"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  {/* Background Image Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Background Image
                    </label>
                    <div className="flex gap-3 items-center">
                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        {uploadingAuthBg ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Choose Image
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadAuthBgImage}
                          disabled={uploadingAuthBg}
                        />
                      </label>
                      {authBgImage && (
                        <div className="relative group">
                          <img
                            src={authBgImage}
                            alt="Background preview"
                            className="h-16 w-28 object-cover rounded-xl border border-white/10"
                          />
                          <button
                            type="button"
                            onClick={() => setAuthBgImage("")}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {!authBgImage && (
                        <span className="text-zinc-600 text-xs italic">No image selected (uses default gradient)</span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingAuthHero}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingAuthHero ? "Saving..." : "Save Hero Section"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Badges List Section */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  Facility Badges List
                </h2>

                {/* Add / Edit Badge Form */}
                <form onSubmit={handleAddOrEditBadge} className="space-y-4 mb-8 bg-black/30 p-5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                    {editingBadgeIdx !== null ? "✏️ Edit Badge" : "➕ Add New Badge"}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Badge Code / Icon Text</label>
                      <input
                        type="text"
                        value={newBadgeCode}
                        onChange={(e) => setNewBadgeCode(e.target.value)}
                        placeholder="e.g. cGMP, 100%, fssai"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Glow Color / Theme</label>
                      <select
                        value={newBadgeColor}
                        onChange={(e) => setNewBadgeColor(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors cursor-pointer"
                      >
                        <option value="yellow">Yellow (cGMP)</option>
                        <option value="blue">Blue (HACCP)</option>
                        <option value="green">Green (FSSAI)</option>
                        <option value="emerald">Emerald (Kosher)</option>
                        <option value="teal">Teal (FSSC)</option>
                        <option value="red">Red (100% / Third Party)</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Badge Title</label>
                    <input
                      type="text"
                      value={newBadgeTitle}
                      onChange={(e) => setNewBadgeTitle(e.target.value)}
                      placeholder="e.g. CGMP CERTIFIED"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Badge Subtitle / Description</label>
                    <input
                      type="text"
                      value={newBadgeSubtitle}
                      onChange={(e) => setNewBadgeSubtitle(e.target.value)}
                      placeholder="e.g. CURRENT PRACTICE"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingBadgeIdx !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBadgeIdx(null);
                          setNewBadgeCode("");
                          setNewBadgeTitle("");
                          setNewBadgeSubtitle("");
                          setNewBadgeColor("yellow");
                        }}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                    >
                      {editingBadgeIdx !== null ? "Update Badge" : "Add Badge"}
                    </button>
                  </div>
                </form>

                {/* Badges List Table */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Badges ({authBadges.length})</h3>
                  <div className="space-y-2">
                    {authBadges.length === 0 ? (
                      <p className="text-zinc-500 text-sm font-medium py-2">No badges added yet. Add your first badge above.</p>
                    ) : (
                      authBadges.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5 group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black uppercase bg-zinc-950 border border-white/10`}>
                              <span style={{ color: item.color === 'yellow' ? '#EAB308' : item.color === 'blue' ? '#3B82F6' : item.color === 'green' ? '#22C55E' : item.color === 'emerald' ? '#10B981' : item.color === 'teal' ? '#14B8A6' : item.color === 'red' ? '#EF4444' : item.color === 'purple' ? '#A855F7' : '#F97316' }}>
                                {item.code}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase">{item.title}</h4>
                              <p className="text-xs text-zinc-500 uppercase">{item.subtitle}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEditBadge(idx)}
                              className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBadge(idx)}
                              className="text-zinc-400 hover:text-red-500 p-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-500/20 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 mt-6 pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setSavingAuthHero(true);
                        const val = {
                          tagline: authTagline,
                          subtitle: authSubtitle,
                          title: authTitle,
                          bgImage: authBgImage,
                          badges: authBadges,
                        };
                        await api.post("/cms", {
                          cmsKey: "authenticity-hero",
                          cmsValue: JSON.stringify(val),
                        });
                        toast.success("Authenticity Hero settings and badges saved successfully!");
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to save Authenticity Hero settings");
                      } finally {
                        setSavingAuthHero(false);
                      }
                    }}
                    disabled={savingAuthHero}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {savingAuthHero ? "Saving All..." : "Save All Changes"}
                  </button>
                </div>
              </div>
            </div>
          )
        }

        {
          activeTab === "auth-explainer" && (
            <div className="space-y-8 max-w-3xl w-full">
              {/* Hero Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  Hero Section Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Hero Eyebrow</label>
                    <input
                      type="text"
                      value={authExplainerHeroEyebrow}
                      onChange={(e) => setAuthExplainerHeroEyebrow(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={authExplainerHeroTitle}
                      onChange={(e) => setAuthExplainerHeroTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Hero Description</label>
                  <textarea
                    value={authExplainerHeroDesc}
                    onChange={(e) => setAuthExplainerHeroDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Hero Background Image</label>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                      {uploadingAuthExplainerBg ? <span className="animate-pulse">Uploading...</span> : <><Upload className="w-4 h-4" /> Choose Background</>}
                      <input type="file" accept="image/*" className="hidden" onChange={handleUploadAuthExplainerBg} />
                    </label>
                    {authExplainerHeroBg && (
                      <img src={authExplainerHeroBg} alt="Hero BG Preview" className="h-12 w-20 object-cover rounded-xl border border-white/10" />
                    )}
                  </div>
                </div>
              </div>

              {/* Explainer Block Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  Trust Seal Explainer Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Explainer Eyebrow</label>
                    <input
                      type="text"
                      value={authExplainerEyebrow}
                      onChange={(e) => setAuthExplainerEyebrow(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Explainer Title</label>
                    <input
                      type="text"
                      value={authExplainerTitle}
                      onChange={(e) => setAuthExplainerTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Explainer Description</label>
                  <textarea
                    value={authExplainerDesc}
                    onChange={(e) => setAuthExplainerDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Scratch Code Text Badge</label>
                    <input
                      type="text"
                      value={authExplainerScratch}
                      onChange={(e) => setAuthExplainerScratch(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Scan Text Guideline</label>
                    <input
                      type="text"
                      value={authExplainerScanText}
                      onChange={(e) => setAuthExplainerScanText(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Explainer Bullet Points (CRUD) */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <h3 className="text-sm font-black text-white">Trust Seal Core Features List</h3>
                  <div className="space-y-2">
                    {authExplainerPoints.map((pt, i) => (
                      <div key={i} className="flex justify-between items-center bg-black/30 border border-white/5 px-4 py-2.5 rounded-xl">
                        <span className="text-sm font-semibold text-zinc-300">{pt}</span>
                        <button
                          type="button"
                          onClick={() => setAuthExplainerPoints(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExplainerPoint}
                      onChange={(e) => setNewExplainerPoint(e.target.value)}
                      placeholder="e.g. 100% heavy metals clean tested"
                      className="flex-1 bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newExplainerPoint.trim()) {
                          setAuthExplainerPoints(prev => [...prev, newExplainerPoint.trim()]);
                          setNewExplainerPoint("");
                        }
                      }}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      Add Point
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample Report (Lab Fields) Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  NABL Sample Lab Results (Dynamic Fields)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Report Heading Eyebrow</label>
                    <input
                      type="text"
                      value={authExplainerCertEyebrow}
                      onChange={(e) => setAuthExplainerCertEyebrow(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Report Heading Title</label>
                    <input
                      type="text"
                      value={authExplainerCertTitle}
                      onChange={(e) => setAuthExplainerCertTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Report Section Description</label>
                  <textarea
                    value={authExplainerCertDesc}
                    onChange={(e) => setAuthExplainerCertDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Sample Report Card Title</label>
                    <input
                      type="text"
                      value={authExplainerSampleTitle}
                      onChange={(e) => setAuthExplainerSampleTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Sample Report Card Footer Note</label>
                    <input
                      type="text"
                      value={authExplainerSampleFooter}
                      onChange={(e) => setAuthExplainerSampleFooter(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Lab Fields In-line CRUD */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-white font-sans">Lab Test Fields Configuration</h3>
                    <button
                      type="button"
                      onClick={() => setAuthExplainerSampleResults(prev => [...prev, { label: "New Test", result: "Pass" }])}
                      className="text-red-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Field
                    </button>
                  </div>
                  <div className="space-y-3">
                    {authExplainerSampleResults.map((res, i) => (
                      <div key={i} className="flex gap-3 items-center bg-black/25 border border-white/5 p-4 rounded-2xl">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Test Name / Label</label>
                          <input
                            type="text"
                            value={res.label}
                            onChange={(e) => {
                              const updated = [...authExplainerSampleResults];
                              updated[i].label = e.target.value;
                              setAuthExplainerSampleResults(updated);
                            }}
                            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs font-semibold"
                          />
                        </div>
                        <div className="w-32">
                          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Test Result</label>
                          <input
                            type="text"
                            value={res.result}
                            onChange={(e) => {
                              const updated = [...authExplainerSampleResults];
                              updated[i].result = e.target.value;
                              setAuthExplainerSampleResults(updated);
                            }}
                            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs font-semibold"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setAuthExplainerSampleResults(prev => prev.filter((_, idx) => idx !== i))}
                          className="self-end text-red-500 hover:text-white p-2.5 bg-zinc-900 border border-white/5 rounded-xl transition-colors hover:bg-red-955"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  Footer CTA Section Settings
                </h2>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">CTA Heading Title</label>
                  <input
                    type="text"
                    value={authExplainerCtaTitle}
                    onChange={(e) => setAuthExplainerCtaTitle(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">CTA Description Copy</label>
                  <textarea
                    value={authExplainerCtaDesc}
                    onChange={(e) => setAuthExplainerCtaDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Global Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleSaveAuthExplainer}
                  disabled={savingAuthExplainer || uploadingAuthExplainerBg}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs border border-white/5 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingAuthExplainer ? "Saving Settings..." : "Save Authenticity Page"}
                </button>
              </div>
            </div>
          )
        }

        {
          activeTab === "business-enquiry" && (
            <div className="space-y-8 max-w-3xl w-full">
              {/* Hero Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Briefcase className="w-5 h-5 text-red-500" />
                  Hero Header Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Eyebrow Tagline</label>
                    <input
                      type="text"
                      value={b2bHeroEyebrow}
                      onChange={(e) => setB2bHeroEyebrow(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={b2bHeroTitle}
                      onChange={(e) => setB2bHeroTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Hero Description</label>
                  <textarea
                    value={b2bHeroDesc}
                    onChange={(e) => setB2bHeroDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Contact Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Briefcase className="w-5 h-5 text-red-500" />
                  B2B Wholesale Contacts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Wholesale Email</label>
                    <input
                      type="email"
                      value={b2bContactEmail}
                      onChange={(e) => setB2bContactEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Wholesale Phone Number</label>
                    <input
                      type="text"
                      value={b2bContactPhone}
                      onChange={(e) => setB2bContactPhone(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Benefits (CRUD) */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                  <Briefcase className="w-5 h-5 text-red-500" />
                  B2B Partnership Benefits
                </h2>
                <div className="space-y-4">
                  {b2bBenefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3 items-start bg-black/25 border border-white/5 p-4 rounded-2xl">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Benefit Icon</label>
                            <select
                              value={benefit.iconName}
                              onChange={(e) => {
                                const updated = [...b2bBenefits];
                                updated[i].iconName = e.target.value;
                                setB2bBenefits(updated);
                              }}
                              className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs font-semibold appearance-none"
                            >
                              <option value="ShieldAlert">ShieldAlert</option>
                              <option value="Percent">Percent</option>
                              <option value="Truck">Truck</option>
                              <option value="TrendingUp">TrendingUp</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Benefit Title</label>
                            <input
                              type="text"
                              value={benefit.title}
                              onChange={(e) => {
                                const updated = [...b2bBenefits];
                                updated[i].title = e.target.value;
                                setB2bBenefits(updated);
                              }}
                              className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-3 py-2 outline-none text-white text-xs font-semibold"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Benefit Description</label>
                          <textarea
                            value={benefit.desc}
                            onChange={(e) => {
                              const updated = [...b2bBenefits];
                              updated[i].desc = e.target.value;
                              setB2bBenefits(updated);
                            }}
                            rows={2}
                            className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-3 outline-none text-white text-xs font-semibold resize-none"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setB2bBenefits(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-red-500 hover:text-white p-2.5 bg-zinc-900 border border-white/5 rounded-xl transition-colors hover:bg-red-955"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400">➕ Add New Benefit Card</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Icon</label>
                      <select
                        value={newB2bBenefitIcon}
                        onChange={(e) => setNewB2bBenefitIcon(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      >
                        <option value="ShieldAlert">ShieldAlert</option>
                        <option value="Percent">Percent</option>
                        <option value="Truck">Truck</option>
                        <option value="TrendingUp">TrendingUp</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={newB2bBenefitTitle}
                        onChange={(e) => setNewB2bBenefitTitle(e.target.value)}
                        placeholder="e.g. Instant Wholesale Portal"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Description</label>
                    <textarea
                      value={newB2bBenefitDesc}
                      onChange={(e) => setNewB2bBenefitDesc(e.target.value)}
                      placeholder="Details of the benefit card..."
                      rows={2}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl p-4 outline-none text-white text-sm transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newB2bBenefitTitle.trim() && newB2bBenefitDesc.trim()) {
                        setB2bBenefits(prev => [...prev, {
                          iconName: newB2bBenefitIcon,
                          title: newB2bBenefitTitle.trim(),
                          desc: newB2bBenefitDesc.trim()
                        }]);
                        setNewB2bBenefitTitle("");
                        setNewB2bBenefitDesc("");
                      } else {
                        toast.error("Title and Description are required to add a benefit card.");
                      }
                    }}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Add Benefit Card
                  </button>
                </div>
              </div>

              {/* Global Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleSaveB2bConfig}
                  disabled={savingB2bConfig}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs border border-white/5 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingB2bConfig ? "Saving Settings..." : "Save Business Enquiry"}
                </button>
              </div>
            </div>
          )
        }

        {
          activeTab === "home-sections" && (
            <div className="space-y-8 max-w-5xl w-full">
              {/* Brand Film Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Homepage Brand Film Settings ("The Standard")
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Eyebrow Text</label>
                      <input
                        type="text"
                        value={brandFilmEyebrow}
                        onChange={(e) => setBrandFilmEyebrow(e.target.value)}
                        placeholder="E.g., The Standard"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={brandFilmTitle}
                        onChange={(e) => setBrandFilmTitle(e.target.value)}
                        placeholder="E.g., Built for lifters who respect the work"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Description</label>
                    <textarea
                      value={brandFilmDesc}
                      onChange={(e) => setBrandFilmDesc(e.target.value)}
                      placeholder="Enter description..."
                      rows={3}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Video Cover Image</label>
                    <div className="flex gap-3 items-center">
                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        {uploadingBrandFilmImage ? (
                          <span className="animate-pulse">Uploading...</span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Choose Image
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadBrandFilmImage}
                          disabled={uploadingBrandFilmImage}
                        />
                      </label>
                      {brandFilmImageUrl && (
                        <div className="relative group">
                          <img
                            src={brandFilmImageUrl}
                            alt="Brand film preview"
                            className="h-16 w-16 object-cover rounded-xl border border-white/10"
                          />
                          <button
                            type="button"
                            onClick={() => setBrandFilmImageUrl("")}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity animate-none"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {!brandFilmImageUrl && (
                        <span className="text-zinc-600 text-xs italic">No image selected (website logo will be shown as fallback)</span>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveBrandFilm}
                      disabled={savingBrandFilm || uploadingBrandFilmImage}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingBrandFilm ? "Saving..." : "Save Brand Film settings"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Why Choose Us Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form to Add Card */}
                <div className="lg:col-span-5 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-fit">
                  <form onSubmit={handleAddOrEditWhyChooseUsCard} className="space-y-4">
                    <h2 className="text-base font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      {editingWhyChooseUsCardIdx !== null ? "Edit Why Choose Us Card" : "Add Why Choose Us Card"}
                    </h2>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Card Icon (Lucide Icon Name)</label>
                      <select
                        value={whyChooseUsCardIcon}
                        onChange={(e) => setWhyChooseUsCardIcon(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      >
                        <option value="ShieldCheck">ShieldCheck (Security / Batch Tested)</option>
                        <option value="Truck">Truck (Delivery / Fulfillment)</option>
                        <option value="BadgeCheck">BadgeCheck (Authenticity)</option>
                        <option value="Dumbbell">Dumbbell (Athletes / Workout)</option>
                        <option value="Clock">Clock (Hours)</option>
                        <option value="Sparkles">Sparkles (Ingredients)</option>
                        <option value="Zap">Zap (Energy)</option>
                        <option value="Award">Award (Certificates)</option>
                        <option value="TrendingUp">TrendingUp (Growth)</option>
                        <option value="Newspaper">Newspaper (Media)</option>
                        <option value="BookOpen">BookOpen (Education)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Card Title</label>
                      <input
                        type="text"
                        value={whyChooseUsCardTitle}
                        onChange={(e) => setWhyChooseUsCardTitle(e.target.value)}
                        placeholder="E.g., Batch Tested"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Card Description Copy</label>
                      <textarea
                        value={whyChooseUsCardCopy}
                        onChange={(e) => setWhyChooseUsCardCopy(e.target.value)}
                        placeholder="E.g., Quality checked for consistency and purity."
                        rows={3}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      {editingWhyChooseUsCardIdx !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingWhyChooseUsCardIdx(null);
                            setWhyChooseUsCardTitle("");
                            setWhyChooseUsCardCopy("");
                            setWhyChooseUsCardIcon("ShieldCheck");
                          }}
                          className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-wider border border-white/5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        {editingWhyChooseUsCardIdx !== null ? "Update Card" : "Add Card to list"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List and Global Text */}
                <div className="lg:col-span-7 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-3">
                      <h2 className="text-lg font-black text-white flex items-center gap-2">
                        <Settings className="w-5 h-5 text-red-500" />
                        Why Choose Us Section settings
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Section Eyebrow</label>
                        <input
                          type="text"
                          value={whyChooseUsEyebrow}
                          onChange={(e) => setWhyChooseUsEyebrow(e.target.value)}
                          placeholder="Why Choose Us"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Section Title</label>
                        <input
                          type="text"
                          value={whyChooseUsTitle}
                          onChange={(e) => setWhyChooseUsTitle(e.target.value)}
                          placeholder="Premium quality without the gym-bro noise"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Section Description</label>
                      <textarea
                        value={whyChooseUsDesc}
                        onChange={(e) => setWhyChooseUsDesc(e.target.value)}
                        placeholder="Description text..."
                        rows={2}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Cards List ({whyChooseUsCards.length})</h3>
                      {whyChooseUsCards.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500 font-medium">
                          No custom trust cards added yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {whyChooseUsCards.map((item, idx) => (
                            <div key={idx} className="bg-black/40 rounded-xl p-3 border border-white/5 flex gap-3 items-center group relative hover:border-red-500/20 transition-all">
                              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 font-bold border border-red-500/20 text-xs">
                                {item.iconName ? item.iconName.substring(0, 3) : "Card"}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-black text-white truncate">{item.title}</h4>
                                <p className="text-zinc-500 text-[10px] mt-0.5 truncate">{item.copy}</p>
                              </div>
                              <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditWhyChooseUsCard(idx)}
                                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-500 flex items-center justify-center border border-white/5 cursor-pointer"
                                  title="Edit"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWhyChooseUsCard(idx)}
                                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 flex items-center justify-center border border-white/5 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-5 mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveWhyChooseUs}
                      disabled={savingWhyChooseUs}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingWhyChooseUs ? "Saving..." : "Save Why Choose Us to Database"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          activeTab === "footer" && (
            <div className="space-y-8 max-w-3xl w-full">
              {/* Why Choose Us Stats Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  Why Choose Us stats
                </h2>

                {/* Add / Edit Stat Form */}
                <form onSubmit={handleAddOrEditStat} className="space-y-4 mb-8 bg-black/30 p-5 rounded-2xl border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                    {editingStatIdx !== null ? "✏️ Edit Stat Card" : "➕ Add New Stat Card"}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Stat Value / Title</label>
                      <input
                        type="text"
                        value={statValue}
                        onChange={(e) => setStatValue(e.target.value)}
                        placeholder="e.g. 16 YEARS, 10M+, FREE"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Card Styling Style</label>
                      <select
                        value={statStyle}
                        onChange={(e) => setStatStyle(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors cursor-pointer"
                      >
                        <option value="default">Default (Dark Glassmorphism)</option>
                        <option value="red">Red Highlight (Gradient Fill)</option>
                        <option value="grey">Grey Highlight (Solid Fill)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Stat Subtitle / Description Label</label>
                    <input
                      type="text"
                      value={statLabel}
                      onChange={(e) => setStatLabel(e.target.value)}
                      placeholder="e.g. Happy Customers, Fast Shipping"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingStatIdx !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStatIdx(null);
                          setStatValue("");
                          setStatLabel("");
                          setStatStyle("default");
                        }}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest cursor-pointer"
                    >
                      {editingStatIdx !== null ? "Update Stat" : "Add Stat Card"}
                    </button>
                  </div>
                </form>

                {/* Stat List Table */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Stat Cards ({footerStats.length})</h3>
                  <div className="space-y-2">
                    {footerStats.length === 0 ? (
                      <p className="text-zinc-500 text-sm font-medium py-2">No stat cards added yet. Add your first card above.</p>
                    ) : (
                      footerStats.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5 group">
                          <div>
                            <span className="text-sm font-black text-white">{item.value}</span>
                            <p className="text-xs text-zinc-500 uppercase font-bold mt-0.5">{item.label}</p>
                            <span className="inline-block text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 rounded-full mt-1.5 text-zinc-400">
                              Style: {item.style === 'red' ? 'Red Highlight' : item.style === 'grey' ? 'Grey Solid' : 'Default'}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartEditStat(idx)}
                              className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStat(idx)}
                              className="text-zinc-400 hover:text-red-500 p-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-red-500/20 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Newsletter & Socials Settings */}
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
                <form onSubmit={handleSaveFooterConfig} className="space-y-6">
                  <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Globe className="w-5 h-5 text-red-500" />
                    Newsletter & Social Links
                  </h2>

                  {/* Newsletter Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Newsletter Title
                    </label>
                    <input
                      type="text"
                      value={newsletterTitle}
                      onChange={(e) => setNewsletterTitle(e.target.value)}
                      placeholder="e.g. Newsletter"
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  {/* Newsletter Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                      Newsletter Description Copy
                    </label>
                    <textarea
                      value={newsletterDesc}
                      onChange={(e) => setNewsletterDesc(e.target.value)}
                      placeholder="Enter subscription description copy..."
                      rows={3}
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Social links grid */}
                  <div className="border-t border-white/5 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Social Media Profile Links</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Facebook URL</label>
                        <input
                          type="text"
                          value={socialFb}
                          onChange={(e) => setSocialFb(e.target.value)}
                          placeholder="#"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={socialIg}
                          onChange={(e) => setSocialIg(e.target.value)}
                          placeholder="#"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Twitter (X) URL</label>
                        <input
                          type="text"
                          value={socialTw}
                          onChange={(e) => setSocialTw(e.target.value)}
                          placeholder="#"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">YouTube URL</label>
                        <input
                          type="text"
                          value={socialYt}
                          onChange={(e) => setSocialYt(e.target.value)}
                          placeholder="#"
                          className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingFooterConfig}
                      className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingFooterConfig ? "Saving..." : "Save Footer Configs"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
}

export default function AdminCmsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading CMS...</div>
      </div>
    }>
      <CMSPageContent />
    </Suspense>
  );
}
