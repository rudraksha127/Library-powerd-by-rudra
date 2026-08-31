"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send } from "lucide-react";
import { db, isConfigured, collection, addDoc, query, orderBy, getDocs, doc, setDoc, getDoc, serverTimestamp } from "@/lib/firebase";

interface Props {
  pageId: string;
}

interface Comment {
  id: string | number;
  text: string;
  time: string;
}

export function LikeComment({ pageId }: Props) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      if (isConfigured) {
        try {
          // Load Likes
          const likeDoc = await getDoc(doc(db, "likes", pageId));
          if (likeDoc.exists()) {
            // Check if current device liked it (simplified via localStorage for anonymous users)
            const localLike = localStorage.getItem(`aurora-like-${pageId}`);
            if (localLike) setLiked(JSON.parse(localLike));
          }

          // Load Comments
          const q = query(collection(db, "pages", pageId, "comments"), orderBy("timestamp", "asc"));
          const snapshot = await getDocs(q);
          const loadedComments = snapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text,
            time: new Date(doc.data().timestamp?.toDate() || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setComments(loadedComments);
        } catch (error) {
          console.error("Firebase load error, falling back to local", error);
          loadLocal();
        }
      } else {
        loadLocal();
      }
      setLoading(false);
    };

    const loadLocal = () => {
      const savedLike = localStorage.getItem(`aurora-like-${pageId}`);
      const savedComments = localStorage.getItem(`aurora-comments-${pageId}`);
      if (savedLike) setLiked(JSON.parse(savedLike));
      if (savedComments) setComments(JSON.parse(savedComments));
    };

    loadData();
  }, [pageId]);

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`aurora-like-${pageId}`, JSON.stringify(next));

    if (isConfigured) {
      try {
        const likeRef = doc(db, "likes", pageId);
        const docSnap = await getDoc(likeRef);
        const currentCount = docSnap.exists() ? docSnap.data().count : 0;
        await setDoc(likeRef, { count: next ? currentCount + 1 : Math.max(0, currentCount - 1) }, { merge: true });
      } catch (e) {
        console.error("Error saving like", e);
      }
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    
    const commentText = newComment.trim();
    setNewComment(""); // Optimistic clear
    
    const optimisticComment: Comment = {
      id: Date.now(),
      text: commentText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updated = [...comments, optimisticComment];
    setComments(updated);
    localStorage.setItem(`aurora-comments-${pageId}`, JSON.stringify(updated));

    if (isConfigured) {
      try {
        await addDoc(collection(db, "pages", pageId, "comments"), {
          text: commentText,
          timestamp: serverTimestamp()
        });
      } catch (e) {
        console.error("Error saving comment", e);
      }
    }
  };

  if (loading) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 px-4">
      {/* Like & Comment Buttons */}
      <div className="flex items-center justify-center gap-6">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={toggleLike}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all cursor-pointer"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${liked ? "fill-[var(--color-blush-pink)] text-[var(--color-blush-pink)]" : "text-white/50"}`} 
          />
          <span className={`font-body text-xs tracking-widest uppercase ${liked ? "text-[var(--color-blush-pink)]" : "text-white/50"}`}>
            {liked ? "Loved" : "Like"}
          </span>
        </motion.button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-white/50" />
          <span className="font-body text-xs tracking-widest uppercase text-white/50">
            {comments.length > 0 ? `${comments.length}` : "Comment"}
          </span>
        </button>
      </div>

      {/* Comments Panel */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 overflow-hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5">
              {/* Comment List */}
              {comments.length > 0 && (
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-champagne-gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] text-[var(--color-champagne-gold)]">✦</span>
                      </div>
                      <div>
                        <p className="font-body text-sm text-white/70 leading-relaxed">{c.text}</p>
                        <span className="font-body text-[10px] text-white/25">{c.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addComment()}
                  placeholder="Write something..."
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 font-body text-sm text-white/80 placeholder:text-white/25 outline-none focus:border-[var(--color-champagne-gold)]/40 transition-colors"
                />
                <button
                  onClick={addComment}
                  className="w-10 h-10 rounded-full bg-[var(--color-champagne-gold)]/20 flex items-center justify-center hover:bg-[var(--color-champagne-gold)]/30 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[var(--color-champagne-gold)]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
