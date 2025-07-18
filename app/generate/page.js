"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { getPlatformInfo } from "@/utils/platformIcons";

const blankLink = { link: "", linktext: "" };

export function Generate() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const newHandle = searchParams?.get("newHandle");
  const initialHandle = searchParams?.get("handle") ?? "";
  const [handle, setHandle] = useState(initialHandle);
  const [links, setLinks] = useState([blankLink]);
  const [desc, setDesc] = useState("");
  const [uploadMethod, setUploadMethod] = useState("file");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Ref to track if we've already shown the toast for this handle
  const shownToastRef = useRef({});

  useEffect(() => {
    if (
      newHandle === "true" &&
      handle &&
      !shownToastRef.current[handle]
    ) {
      toast.info(`Handle "${handle}" doesn't exist yet. You can claim it now!`, {
        position: "top-right",
        autoClose: 5000,
      });
      shownToastRef.current[handle] = true;
    }
  }, [newHandle, handle]);

  const handleChange = (index, link = "", linktext = "") => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => setLinks((prev) => [...prev, blankLink]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url || null);
  };

  const submitLinks = async () => {
    try {
      let opts;

      if (uploadMethod === "file") {
        if (!selectedImage) {
          toast.error("Please select an image file or switch to URL upload.");
          return;
        }
        const fd = new FormData();
        fd.append("handle", handle);
        fd.append("desc", desc);
        fd.append("image", selectedImage);
        fd.append("links", JSON.stringify(links));
        opts = { method: "POST", body: fd };
      } else {
        if (!imageUrl.trim()) {
          toast.error("Please enter an image URL or switch to file upload.");
          return;
        }
        opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            handle,
            desc,
            imageUrl: imageUrl.trim(),
            links,
          }),
        };
      }

      const res = await fetch("/api/add", opts);
      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([blankLink]);
        setSelectedImage(null);
        setImageUrl("");
        setImagePreview(null);
        setHandle("");
        setDesc("");
        setTimeout(() => router.push("/"), 2000);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10131a] to-[#1a2332] ">
        {/* Main Content - Centered */}
        <div className="flex flex-col items-center justify-center w-full max-w-xl px-4 py-16">
          <h1 className="font-extrabold text-3xl md:text-4xl text-center text-white mb-2 tracking-tight pt-24">Create your OneClink</h1>
          {/* Step 1 */}
          <section className="bg-[#151b26] border border-cyan-700/30 rounded-xl p-6 mb-2 w-full">
            <h2 className="font-semibold text-lg text-cyan-400 mb-2">Step 1: Claim your Handle</h2>
            <input
              value={handle}
              readOnly
              className="px-4 py-3 w-full rounded-lg bg-[#10131a] border border-cyan-700/40 text-white placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-base"
              type="text"
              placeholder="Choose a Handle"
            />
          </section>
          {/* Step 2 */}
          <section className="bg-[#151b26] border border-cyan-700/30 rounded-xl p-6 mb-2 w-full">
            <h2 className="font-semibold text-lg text-cyan-400 mb-4">Step 2: Add Links</h2>
            {links.map((item, index) => {
              const link = item.link ?? "";
              const linktext = item.linktext ?? "";
              const platformInfo = getPlatformInfo(link, linktext);
              return (
                <div key={index} className="mb-4 p-3 bg-[#10131a] rounded-lg border border-cyan-700/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl bg-[#151b26] p-2 rounded-full border border-cyan-700/20">{platformInfo.icon}</div>
                    <span className="text-xs text-cyan-200 font-medium">{platformInfo.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      value={linktext}
                      onChange={(e) => handleChange(index, link, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-cyan-700/20 bg-[#151b26] text-white placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      type="text"
                      placeholder="Link text (e.g., Instagram)"
                    />
                    <input
                      value={link}
                      onChange={(e) => handleChange(index, e.target.value, linktext)}
                      className="flex-1 px-3 py-2 rounded-lg border border-cyan-700/20 bg-[#151b26] text-white placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      type="text"
                      placeholder="URL (e.g., https://...)"
                    />
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setLinks(links.filter((_, i) => i !== index))}
                        className="ml-2 px-3 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-all text-xs"
                      >
                       -
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <button
              onClick={addLink}
              className="w-full mt-2 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all"
            >
              + Add Link
            </button>
          </section>
          {/* Step 3 */}
          <section className="bg-[#151b26] border border-cyan-700/30 rounded-xl p-6 w-full">
            <h2 className="font-semibold text-lg text-cyan-400 mb-4">Step 3: Add Picture and Description</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center mb-2">
                <label className="text-cyan-200 font-medium">Image Source:</label>
                <label className="flex items-center gap-1 text-cyan-200">
                  <input
                    type="radio"
                    name="uploadMethod"
                    value="file"
                    checked={uploadMethod === "file"}
                    onChange={() => {
                      setUploadMethod("file");
                      setImagePreview(selectedImage ? imagePreview : null);
                    }}
                  />
                  PC
                </label>
                <label className="flex items-center gap-1 text-cyan-200">
                  <input
                    type="radio"
                    name="uploadMethod"
                    value="url"
                    checked={uploadMethod === "url"}
                    onChange={() => {
                      setUploadMethod("url");
                      setImagePreview(imageUrl || null);
                    }}
                  />
                  Link
                </label>
              </div>
              {uploadMethod === "file" ? (
                <input
                  key="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-cyan-200"
                />
              ) : (
                <input
                  key="url"
                  type="text"
                  placeholder="Paste image URL here"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="w-full px-3 py-2 bg-[#10131a] border border-cyan-700/20 rounded-lg text-cyan-200 placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                />
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded-lg max-w-xs max-h-40 border border-cyan-700/20 object-contain"
                  style={{ width: 'auto', height: 'auto', maxWidth: '240px', maxHeight: '160px', display: 'block' }}
                />
              )}
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#10131a] border border-cyan-700/20 text-cyan-200 placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                type="text"
                placeholder="Enter description"
              />
              <button
                disabled={
                  !handle ||
                  !links[0].linktext ||
                  (uploadMethod === "file" ? !selectedImage : !imageUrl)
                }
                onClick={submitLinks}
                className="w-full py-2 mt-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all disabled:bg-cyan-900"
              >
                Create your OneClink
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Only export the wrapper, do not render <Generate /> directly
export default function GeneratePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  );
}
