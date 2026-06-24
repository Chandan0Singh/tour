"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
    const params = useParams();
  const slug = params?.slug;


  const fetchBlog = async () => {
    try {

        console.log("Slug:", slug);

      const res = await fetch(
        `http://localhost:5000/api/blog/${slug}`
      );

      const data = await res.json();

      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchBlog();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog Not Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <img
        src={`http://localhost:5000/${blog.featuredImage}`}
        alt={blog.title}
        className="w-full h-[450px] object-cover rounded-xl mb-8"
      />

      <p className="text-green-700 font-medium mb-2">
        {blog.category}
      </p>

      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <div className="flex gap-4 text-gray-500 mb-8">
        <span>{blog.author}</span>
        <span>
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span>{blog.views} Views</span>
      </div>

      <p className="text-lg text-gray-600 mb-8">
        {blog.description}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </div>
  );
}