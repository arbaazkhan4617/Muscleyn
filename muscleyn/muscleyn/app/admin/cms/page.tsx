"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/services/api";
import toast from "react-hot-toast";
import { FileText, Save, ShieldCheck, Zap, Settings, Plus, Pencil, Trash2, Globe, Sparkles, Award } from "lucide-react";

function CMSPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "flash";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [loading, setLoading] = useState(true);
  const [savingTerms, setSavingTerms] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [savingFlash, setSavingFlash] = useState(false);
  const [savingGoals, setSavingGoals] = useState(false);
  const [savingBlogs, setSavingBlogs] = useState(false);
  const [savingNews, setSavingNews] = useState(false);

  // Terms & Conditions
  const [terms, setTerms] = useState("");

  // Privacy Policy
  const [privacy, setPrivacy] = useState("");

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

  // News State
  const [newsList, setNewsList] = useState<any[]>([]);
  const [editingNewsIdx, setEditingNewsIdx] = useState<number | null>(null);
  const [newsPublisher, setNewsPublisher] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [newsHeadline, setNewsHeadline] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [newsDetail, setNewsDetail] = useState("");
  const [newsIcon, setNewsIcon] = useState("Newspaper");

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["flash", "terms", "privacy", "goals", "blogs", "news"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // LOAD ALL CONFIGS
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);
        const [termsRes, privacyRes, flashRes, goalsRes, blogsRes, newsRes] = await Promise.allSettled([
          api.get("/cms/terms-and-conditions"),
          api.get("/cms/privacy-policy"),
          api.get("/cms/flash-sale-offer"),
          api.get("/cms/goals-list"),
          api.get("/cms/blogs-list"),
          api.get("/cms/news-list")
        ]);

        if (termsRes.status === "fulfilled" && termsRes.value.data.data) {
          setTerms(termsRes.value.data.data.cmsValue || "");
        }
        if (privacyRes.status === "fulfilled" && privacyRes.value.data.data) {
          setPrivacy(privacyRes.value.data.data.cmsValue || "");
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
          } catch (e) {}
        }
        if (blogsRes.status === "fulfilled" && blogsRes.value.data.data && blogsRes.value.data.data.cmsValue) {
          try {
            setBlogsList(JSON.parse(blogsRes.value.data.data.cmsValue));
          } catch (e) {}
        }
        if (newsRes.status === "fulfilled" && newsRes.value.data.data && newsRes.value.data.data.cmsValue) {
          try {
            setNewsList(JSON.parse(newsRes.value.data.data.cmsValue));
          } catch (e) {}
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
      icon: newsIcon
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
  };

  const handleStartEditNews = (idx: number) => {
    const item = newsList[idx];
    setNewsPublisher(item.publisher || "");
    setNewsDate(item.date || "");
    setNewsHeadline(item.headline || "");
    setNewsSummary(item.summary || "");
    setNewsDetail(item.detail || "");
    setNewsIcon(item.icon || "Newspaper");
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
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                isActive
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
          <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl max-w-3xl">
            <form onSubmit={handleSaveFlash} className="space-y-6">
              <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                Flash Sale Offer Banner Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Offer Banner Title
                  </label>
                  <input
                    type="text"
                    value={flashTitle}
                    onChange={(e) => setFlashTitle(e.target.value)}
                    placeholder="E.g., Flash Sale Active"
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Offer Subtitle / Description
                  </label>
                  <input
                    type="text"
                    value={flashSubtitle}
                    onChange={(e) => setFlashSubtitle(e.target.value)}
                    placeholder="E.g., Up to 40% off on all whey proteins."
                    className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-3 outline-none text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                    Timer Duration
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Hours</span>
                      <input
                        type="number"
                        value={flashHours}
                        onChange={(e) => setFlashHours(Number(e.target.value))}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Minutes</span>
                      <input
                        type="number"
                        value={flashMinutes}
                        onChange={(e) => setFlashMinutes(Number(e.target.value))}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Seconds</span>
                      <input
                        type="number"
                        value={flashSeconds}
                        onChange={(e) => setFlashSeconds(Number(e.target.value))}
                        className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-sm transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${flashActive ? 'bg-green-500/20 border-green-500/30' : 'bg-white/10 border-white/10'} border`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${flashActive ? 'translate-x-6 bg-green-500' : 'bg-zinc-500'}`}></div>
                    </div>
                    <input type="checkbox" className="hidden" checked={flashActive} onChange={(e) => setFlashActive(e.target.checked)} />
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">Visible on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingFlash}
                  className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-xs uppercase tracking-widest border border-white/5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingFlash ? "Saving..." : "Save Banner Settings"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* GOALS TAB */}
        {activeTab === "goals" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-black border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 outline-none text-white text-xs transition-colors"
                    />
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
            <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    Active Blog Posts
                  </h2>
                  <span className="text-xs font-bold text-zinc-500 uppercase">{blogsList.length} Posts</span>
                </div>

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
        )}

        {/* NEWS TAB */}
        {activeTab === "news" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-red-500" />
                    Active News Publications
                  </h2>
                  <span className="text-xs font-bold text-zinc-500 uppercase">{newsList.length} Publications</span>
                </div>

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
        )}

        {activeTab === "terms" && (
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
        )}

        {activeTab === "privacy" && (
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
        )}
      </div>
    </div>
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
