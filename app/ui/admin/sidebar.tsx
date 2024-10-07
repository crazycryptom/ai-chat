import Link from "next/link";

const sidelinks = [
  { content: "Assistant", href: "/admin/assistant" },
  { content: "Theme", href: "/admin/theme" },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {sidelinks.map((link, index) => (
        <div key={index} className="py-3">
          <Link
            href={link.href}
            className="block px-4 text-lg font-medium text-gray-300 hover:text-white"
          >
            {link.content}
          </Link>
        </div>
      ))}
    </div>
  );
}
