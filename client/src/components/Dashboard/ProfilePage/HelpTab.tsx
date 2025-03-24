import { ChevronRight } from "lucide-react";

const HelpTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Help & Support</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            <div className="border rounded-md overflow-hidden">
              <button className="flex items-center justify-between w-full p-4 text-left bg-[hsl(var(--accent))] hover:bg-[hsl(var(--muted))]">
                <span className="font-medium">
                  How do I create a new class?
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border rounded-md overflow-hidden">
              <button className="flex items-center justify-between w-full p-4 text-left bg-[hsl(var(--accent))] hover:bg-[hsl(var(--muted))]">
                <span className="font-medium">
                  How do I add students to my class?
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border rounded-md overflow-hidden">
              <button className="flex items-center justify-between w-full p-4 text-left bg-[hsl(var(--accent))] hover:bg-[hsl(var(--muted))]">
                <span className="font-medium">
                  How do I create and assign homework?
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border rounded-md overflow-hidden">
              <button className="flex items-center justify-between w-full p-4 text-left bg-[hsl(var(--accent))] hover:bg-[hsl(var(--muted))]">
                <span className="font-medium">How do I generate reports?</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Contact Support</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
                Subject
              </label>
              <select className="w-full p-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))]">
                <option>Technical Issue</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--muted-foreground))] mb-1">
                Message
              </label>
              <textarea
                className="w-full p-2 border border-[hsl(var(--border))] bg-[hsl(var(--accent))] rounded-md h-32"
                placeholder="Describe your issue or question..."
              />
            </div>
          </div>

          <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md flex items-center mt-4">
            Send Message
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">
            Documentation & Tutorials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4 hover:bg-[hsl(var(--muted))] cursor-pointer">
              <h4 className="font-medium mb-1">Getting Started Guide</h4>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Learn the basics of Smart Class Management.
              </p>
            </div>

            <div className="border rounded-md p-4 hover:bg-[hsl(var(--muted))] cursor-pointer">
              <h4 className="font-medium mb-1">Video Tutorials</h4>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Watch step-by-step guides for common tasks.
              </p>
            </div>

            <div className="border rounded-md p-4 hover:bg-[hsl(var(--muted))] cursor-pointer">
              <h4 className="font-medium mb-1">Advanced Features</h4>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Discover tips and tricks for power users.
              </p>
            </div>

            <div className="border rounded-md p-4 hover:bg-[hsl(var(--muted))] cursor-pointer">
              <h4 className="font-medium mb-1">API Documentation</h4>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Integrate with other tools and services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpTab;
