import SettingsCard from "../../Components/admin/SettingsCard";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-[#1B5E20]">
            Settings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your website configuration
          </p>
        </div>

        <SettingsCard
          title="Website Information"
          fields={[
            "Website Name",
            "Tagline",
            "Support Email",
            "Contact Number",
            "Office Address",
          ]}
        />

        <SettingsCard
          title="Booking Settings"
          switches={[
            "Allow Online Booking",
            "Booking Confirmation",
            "Cancellation Allowed",
          ]}
        />

        <SettingsCard
          title="Notification Settings"
          switches={[
            "Email Notifications",
            "SMS Notifications",
            "Booking Alerts",
            "Enquiry Alerts",
          ]}
        />

        <SettingsCard
          title="Homepage Settings"
          fields={[
            "Hero Banner Title",
            "Hero Banner Subtitle",
            "Featured Treks",
            "Featured Tours",
          ]}
        />

        <SettingsCard
          title="Contact Information"
          fields={[
            "Phone",
            "Email",
            "Google Map URL",
          ]}
        />

        <SettingsCard
          title="Social Media"
          fields={[
            "Facebook",
            "Instagram",
            "YouTube",
            "Twitter / X",
          ]}
        />

        <SettingsCard
          title="Theme Settings"
          fields={[
            "Primary Color",
            "Secondary Color",
            "Accent Color",
          ]}
        />

        <SettingsCard
          title="Footer Settings"
          fields={[
            "Copyright",
            "Footer Description",
          ]}
          switches={["Newsletter"]}
        />

      </div>
    </div>
  );
}