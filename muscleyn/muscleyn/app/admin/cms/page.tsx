"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/services/api";
import toast from "react-hot-toast";
import { FileText, Save, ShieldCheck, Zap, Settings, Plus, Pencil, Trash2, Globe, Sparkles, Award, Phone, Mail, MapPin, Clock, Headphones, MessageCircle, Send, Image, Upload, ExternalLink, ToggleLeft, ToggleRight, XCircle } from "lucide-react";

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

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["flash", "terms", "privacy", "goals", "blogs", "news", "return", "contact"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // LOAD ALL CONFIGS
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);
        const [termsRes, privacyRes, returnRes, tickerRes, flashRes, goalsRes, blogsRes, newsRes, blogsHeaderRes, newsHeaderRes, contactHeaderRes, contactInfoRes, contactSupportRes, contactStoresRes, contactFaqsRes, bannersRes] = await Promise.allSettled([
          api.get("/cms/terms-and-conditions"),
          api.get("/cms/privacy-policy"),
          api.get("/cms/return-refund-policy"),
          api.get("/cms/trust-ticker-list"),
          api.get("/cms/flash-sale-offer"),
          api.get("/cms/goals-list"),
          api.get("/cms/blogs-list"),
          api.get("/cms/news-list"),
          api.get("/cms/blogs-page-header"),
          api.get("/cms/news-page-header"),
          api.get("/cms/contact-header"),
          api.get("/cms/contact-info-cards"),
          api.get("/cms/contact-support-cards"),
          api.get("/cms/contact-stores"),
          api.get("/cms/contact-faqs"),
          api.get("/banners")
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
      } catch (err) {
        console.error("Failed to load CMS values", err);
        toast.error("Failed to load CMS configurations");
      } finally {
        setLoading(false);
      }
    };
    loadConfigs();
  }, []);

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
          { id: "goals", label: "Homepage Goals", icon: Settings },
          { id: "blogs", label: "Blogs List", icon: FileText },
          { id: "news", label: "News List", icon: Globe },
          { id: "terms", label: "Terms & Conditions", icon: FileText },
          { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
          { id: "return", label: "Return & Refund Policy", icon: FileText },
          { id: "contact", label: "Contact Us Page", icon: Phone },
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
        {activeTab === "flash" && (
          <div className="space-y-8 max-w-3xl">

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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={goalImg}
                    onChange={(e) => setGoalImg(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
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
                        Background Image URL
                      </label>
                      <input
                        type="text"
                        value={contactHeaderBgImage}
                        onChange={(e) => setContactHeaderBgImage(e.target.value)}
                        placeholder="Image URL"
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>

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
