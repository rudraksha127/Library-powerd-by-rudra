"use client";

import { useEffect, useState } from "react";
import { db, isConfigured, collection, getDocs, doc, getDoc, query, orderBy } from "@/lib/firebase";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pages = ["home", "story", "gallery", "notes"];

  useEffect(() => {
    const fetchData = async () => {
      if (!isConfigured) {
        setLoading(false);
        return;
      }

      const allData = [];
      
      for (const pageId of pages) {
        try {
          // Fetch Likes
          let likesCount = 0;
          const likeDoc = await getDoc(doc(db, "likes", pageId));
          if (likeDoc.exists()) {
            likesCount = likeDoc.data().count;
          }

          // Fetch Comments
          const q = query(collection(db, "pages", pageId, "comments"), orderBy("timestamp", "asc"));
          const snapshot = await getDocs(q);
          const comments = snapshot.docs.map(doc => ({
            text: doc.data().text,
            time: new Date(doc.data().timestamp?.toDate() || Date.now()).toLocaleString()
          }));

          allData.push({ pageId, likesCount, comments });
        } catch (e) {
          console.error("Failed to fetch data for", pageId, e);
        }
      }
      
      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#080810] text-white flex items-center justify-center font-display">Loading Data...</div>;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-[#080810] text-white flex items-center justify-center p-8">
        <div className="max-w-md text-center border border-white/10 bg-white/5 p-8 rounded-3xl">
          <h2 className="text-2xl font-display text-[var(--color-champagne-gold)] mb-4">Firebase Not Configured</h2>
          <p className="font-body text-white/70 text-sm leading-relaxed mb-6">
            You need to set up Firebase and provide your API keys in a <code className="text-white">.env.local</code> file in your project root to see live feedback here.
          </p>
          <div className="text-left bg-black/50 p-4 rounded-xl text-xs text-white/50 font-mono">
            NEXT_PUBLIC_FIREBASE_API_KEY="..."<br/>
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."<br/>
            NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."<br/>
            // ...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080810] text-white p-8">
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="font-display text-3xl tracking-[0.2em] uppercase text-[var(--color-champagne-gold)] mb-12 border-b border-white/10 pb-6">
          Aurora Admin Dashboard
        </h1>

        <div className="space-y-12">
          {data.map((pageData) => (
            <div key={pageData.pageId} className="border border-white/10 bg-white/[0.02] p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-xl uppercase tracking-widest text-white/90">
                  {pageData.pageId === "home" ? "Hero" : pageData.pageId} Page
                </h2>
                <div className="flex items-center gap-2 bg-[var(--color-blush-pink)]/10 px-4 py-1.5 rounded-full border border-[var(--color-blush-pink)]/20">
                  <span className="text-[var(--color-blush-pink)]">♥</span>
                  <span className="font-body text-sm font-bold text-white">{pageData.likesCount}</span>
                </div>
              </div>

              <div>
                <h3 className="font-body text-[10px] uppercase tracking-widest text-white/40 mb-4">Comments</h3>
                {pageData.comments.length === 0 ? (
                  <p className="text-white/30 text-sm italic">No comments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {pageData.comments.map((comment: any, idx: number) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="font-body text-sm text-white/80">{comment.text}</p>
                        <p className="font-body text-[10px] text-white/40 mt-2">{comment.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
