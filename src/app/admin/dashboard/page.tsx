'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase, Cake } from '@/lib/supabase';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaImage,
  FaSignOutAlt,
  FaFire,
  FaStar,
  FaUpload,
  FaTimes,
  FaSave,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCake, setEditingCake] = useState<Cake | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    name_bn: '',
    description: '',
    description_bn: '',
    price: '',
    original_price: '',
    category: 'chocolate',
    is_trending: false,
    is_featured: false,
  });

  const fetchCakes = useCallback(async () => {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setCakes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCakes();
  }, [fetchCakes]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `cakes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cakes')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('cakes').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingCake?.image_url || '';

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const cakeData = {
        name: formData.name,
        name_bn: formData.name_bn,
        description: formData.description,
        description_bn: formData.description_bn,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        category: formData.category,
        is_trending: formData.is_trending,
        is_featured: formData.is_featured,
        image_url: imageUrl,
        display_order: editingCake?.display_order || cakes.length + 1,
      };

      if (editingCake) {
        // Update existing cake
        const { error } = await supabase
          .from('cakes')
          .update(cakeData)
          .eq('id', editingCake.id);

        if (error) throw error;
      } else {
        // Insert new cake
        const { error } = await supabase.from('cakes').insert([cakeData]);

        if (error) throw error;
      }

      // Reset form and refresh
      resetForm();
      fetchCakes();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (cake: Cake) => {
    setEditingCake(cake);
    setFormData({
      name: cake.name,
      name_bn: cake.name_bn,
      description: cake.description || '',
      description_bn: cake.description_bn || '',
      price: cake.price.toString(),
      original_price: cake.original_price?.toString() || '',
      category: cake.category,
      is_trending: cake.is_trending,
      is_featured: cake.is_featured,
    });
    setImagePreview(cake.image_url);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি এই কেকটি মুছে ফেলতে চান?')) return;

    const { error } = await supabase.from('cakes').delete().eq('id', id);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      fetchCakes();
    }
  };

  const toggleTrending = async (cake: Cake) => {
    const { error } = await supabase
      .from('cakes')
      .update({ is_trending: !cake.is_trending })
      .eq('id', cake.id);

    if (!error) fetchCakes();
  };

  const toggleFeatured = async (cake: Cake) => {
    const { error } = await supabase
      .from('cakes')
      .update({ is_featured: !cake.is_featured })
      .eq('id', cake.id);

    if (!error) fetchCakes();
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingCake(null);
    setImageFile(null);
    setImagePreview('');
    setFormData({
      name: '',
      name_bn: '',
      description: '',
      description_bn: '',
      price: '',
      original_price: '',
      category: 'chocolate',
      is_trending: false,
      is_featured: false,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎂</span>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-gray-600 hover:text-pink-600"
            >
              সাইট দেখুন
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <FaSignOutAlt />
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'মোট কেক', value: cakes.length, icon: '🎂', color: 'bg-pink-500' },
            { label: 'ট্রেন্ডিং', value: cakes.filter(c => c.is_trending).length, icon: '🔥', color: 'bg-orange-500' },
            { label: 'ফিচার্ড', value: cakes.filter(c => c.is_featured).length, icon: '⭐', color: 'bg-yellow-500' },
            { label: 'ক্যাটাগরি', value: [...new Set(cakes.map(c => c.category))].length, icon: '📁', color: 'bg-blue-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`${stat.color} text-white text-xs px-2 py-1 rounded-full`}>
                  {stat.value}
                </span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        {/* Add New Cake Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">কেক ম্যানেজমেন্ট</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
          >
            <FaPlus />
            নতুন কেক যোগ করুন
          </motion.button>
        </div>

        {/* Cakes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={cake.image_url}
                  alt={cake.name_bn}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {cake.is_trending && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaFire /> ট্রেন্ডিং
                    </span>
                  )}
                  {cake.is_featured && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar /> ফিচার্ড
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{cake.name_bn}</h3>
                <p className="text-gray-500 text-sm">{cake.name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-pink-600">৳{cake.price}</span>
                  <span className="text-sm text-gray-400">{cake.category}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => toggleTrending(cake)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cake.is_trending
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                    }`}
                  >
                    <FaFire className="inline mr-1" />
                    ট্রেন্ডিং
                  </button>
                  <button
                    onClick={() => toggleFeatured(cake)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cake.is_featured
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                    }`}
                  >
                    <FaStar className="inline mr-1" />
                    ফিচার্ড
                  </button>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(cake)}
                    className="flex-1 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <FaEdit className="inline mr-1" />
                    এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(cake.id)}
                    className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    <FaTrash className="inline mr-1" />
                    ডিলিট
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCake ? 'কেক এডিট করুন' : 'নতুন কেক যোগ করুন'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  কেকের ছবি
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer py-8">
                      <FaUpload className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-500">ছবি আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    নাম (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="Chocolate Dream"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    নাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.name_bn}
                    onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="চকলেট ড্রিম"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    বিবরণ (English)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
                    placeholder="Rich Belgian chocolate..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    বিবরণ (বাংলা)
                  </label>
                  <textarea
                    value={formData.description_bn}
                    onChange={(e) => setFormData({ ...formData, description_bn: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
                    placeholder="বেলজিয়ান চকলেট দিয়ে..."
                  />
                </div>
              </div>

              {/* Price & Category */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    দাম (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="1500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    আসল দাম (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                    placeholder="1800"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  >
                    <option value="chocolate">চকলেট</option>
                    <option value="fruit">ফ্রুট</option>
                    <option value="birthday">জন্মদিন</option>
                    <option value="wedding">বিয়ে</option>
                    <option value="special">স্পেশাল</option>
                    <option value="cupcake">কাপকেক</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_trending}
                    onChange={(e) => setFormData({ ...formData, is_trending: e.target.checked })}
                    className="w-5 h-5 text-pink-500 rounded"
                  />
                  <span className="text-gray-700">
                    <FaFire className="inline text-orange-500 mr-1" />
                    ট্রেন্ডিং হিসেবে দেখান
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-5 h-5 text-pink-500 rounded"
                  />
                  <span className="text-gray-700">
                    <FaStar className="inline text-yellow-500 mr-1" />
                    ফিচার্ড হিসেবে দেখান
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      সেভ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingCake ? 'আপডেট করুন' : 'সেভ করুন'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
