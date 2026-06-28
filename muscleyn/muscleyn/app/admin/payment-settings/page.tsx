"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getPaymentConfig, updatePaymentConfig } from "@/services/adminService";
import { Save, Settings } from "lucide-react";

export default function PaymentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    isActive: false,
    paymentType: "PERCENTAGE",
    codUpfrontValue: 0,
    onlineUpfrontValue: 0,
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await getPaymentConfig();
      if (response?.data) {
        setConfig({
          isActive: response.data.isActive || false,
          paymentType: response.data.paymentType || "PERCENTAGE",
          codUpfrontValue: response.data.codUpfrontValue || 0,
          onlineUpfrontValue: response.data.onlineUpfrontValue || 0,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch payment config");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePaymentConfig(config);
      toast.success("Payment settings updated successfully");
    } catch (error) {
      toast.error("Failed to update payment settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse flex flex-col gap-6 max-w-2xl">
          <div className="h-10 bg-zinc-900 rounded w-1/4"></div>
          <div className="h-64 bg-zinc-900 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-500/10 rounded-xl">
          <Settings className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Settings</h1>
          <p className="text-zinc-400 mt-1">Manage upfront partial payments for orders.</p>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 max-w-2xl admin-card">
        <div className="space-y-6">
          {/* Active Toggle */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Enable Partial Payments</h3>
              <p className="text-sm text-zinc-400">Allow customers to pay a part of the order upfront.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={config.isActive}
                onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
              />
              <div className="w-14 h-7 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">Calculation Method</label>
            <select
              value={config.paymentType}
              onChange={(e) => setConfig({ ...config, paymentType: e.target.value })}
              disabled={!config.isActive}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FLAT">Flat Amount (₹)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* COD Value */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                COD Upfront {config.paymentType === "PERCENTAGE" ? "(%)" : "(₹)"}
              </label>
              <input
                type="number"
                min="0"
                value={config.codUpfrontValue}
                onChange={(e) => setConfig({ ...config, codUpfrontValue: Number(e.target.value) })}
                disabled={!config.isActive}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
              />
            </div>

            {/* Online Value */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Online Upfront {config.paymentType === "PERCENTAGE" ? "(%)" : "(₹)"}
              </label>
              <input
                type="number"
                min="0"
                value={config.onlineUpfrontValue}
                onChange={(e) => setConfig({ ...config, onlineUpfrontValue: Number(e.target.value) })}
                disabled={!config.isActive}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
