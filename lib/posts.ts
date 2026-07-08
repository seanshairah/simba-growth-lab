export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  art: string
  content: PostBlock[]
}

export const posts: Post[] = [
  {
    slug: "vanity-metrics-are-lying-to-you",
    title: "Vanity Metrics Are Lying to You — Here's What to Track Instead",
    excerpt:
      "Likes feel good. Reach looks impressive. Neither pays your bills. A field guide to the numbers that actually predict growth.",
    date: "2026-06-14",
    readTime: "5 min read",
    tag: "Analytics",
    art: "linear-gradient(135deg, #e2590c 0%, #f5a45b 55%, #f1f0ec 100%)",
    content: [
      {
        type: "p",
        text: "Every month I sit down with a brand that is celebrating a record month of reach — while their sales are flat. The dashboard is green, the business is not. That gap has a name: vanity metrics.",
      },
      {
        type: "h2",
        text: "Why vanity metrics feel so convincing",
      },
      {
        type: "p",
        text: "Reach, impressions and follower counts all share the same flaw: they only ever go up and to the right if you keep spending or keep posting. They measure activity, not progress. They tell you the machine is running — not that it is running in the right direction.",
      },
      {
        type: "quote",
        text: "A metric is only useful if a bad number would change what you do next.",
      },
      {
        type: "h2",
        text: "The numbers that actually predict growth",
      },
      {
        type: "p",
        text: "Engagement rate per follower tells you whether your audience actually cares. Click-through to your owned channels tells you whether that attention travels. Conversion rate by traffic source tells you which channels bring buyers, not browsers. And repeat engagement — the same people coming back — is the earliest signal of a brand that is compounding.",
      },
      {
        type: "p",
        text: "None of these are hard to measure. They are just harder to celebrate, because they are honest. But honest numbers are the only ones that can point at the budget leaks, the weak content pillars and the channels quietly carrying your growth.",
      },
      {
        type: "h2",
        text: "Where to start this week",
      },
      {
        type: "p",
        text: "Pick your three biggest channels. For each one, write down what it delivered last month in attention (reach), interest (engagement rate) and action (clicks or conversions). If a channel is all attention and no action, you have found your first leak — and your first experiment.",
      },
    ],
  },
  {
    slug: "where-marketing-budgets-leak",
    title: "Where Marketing Budgets Leak: Lessons from Funnel Audits",
    excerpt:
      "Most budgets don't fail in one big place — they bleed out through a dozen small cracks. The recurring leaks I find in almost every funnel audit.",
    date: "2026-05-02",
    readTime: "6 min read",
    tag: "Growth",
    art: "linear-gradient(135deg, #161616 0%, #4a4a45 60%, #e2590c 100%)",
    content: [
      {
        type: "p",
        text: "When a funnel underperforms, the instinct is to spend more at the top: more ads, more content, more reach. But in almost every audit I run, the problem is not the size of the funnel — it is the holes in it.",
      },
      {
        type: "h2",
        text: "Leak #1: Paying for traffic the page can't hold",
      },
      {
        type: "p",
        text: "Brands routinely spend real money driving people to pages that load slowly, bury the offer, or ask for too much too soon. If your landing page converts at one percent, doubling ad spend doubles the waste. Fixing the page doubles the return on every dollar you already spend.",
      },
      {
        type: "h2",
        text: "Leak #2: The journey nobody has actually walked",
      },
      {
        type: "p",
        text: "Map the real path a customer takes — from the ad, to the profile, to the link, to the form, on a phone with average data speeds. Every extra tap loses people. In audits I often find entire steps that exist purely for internal convenience, each one quietly taxing conversion.",
      },
      {
        type: "quote",
        text: "Your funnel is not what your strategy deck says it is. It is what a customer experiences on a Tuesday on mobile data.",
      },
      {
        type: "h2",
        text: "Leak #3: Retargeting the wrong moment",
      },
      {
        type: "p",
        text: "Most abandoned journeys are not rejections — they are interruptions. But retargeting everyone identically means paying premium rates to re-reach people who were never going to buy, while under-serving the warm segment who almost did. Segmenting by how far someone got is the cheapest conversion lift available to most brands.",
      },
      {
        type: "p",
        text: "The pattern across all of these: growth problems are usually measurement problems first. You cannot fix a leak you have not located — and locating leaks is what a funnel audit is for.",
      },
    ],
  },
  {
    slug: "zimbabwe-corporates-on-social-media",
    title: "What Zimbabwe's Corporates Get Wrong (and Right) on Social Media",
    excerpt:
      "After analysing corporate social media performance across Zimbabwe, clear patterns emerge — and the winners aren't who you'd expect.",
    date: "2026-03-21",
    readTime: "5 min read",
    tag: "Social",
    art: "linear-gradient(135deg, #f5a45b 0%, #e2590c 45%, #161616 100%)",
    content: [
      {
        type: "p",
        text: "Spending months inside the social media data of Zimbabwe's corporate brands teaches you one thing quickly: budget and audience size explain far less of the performance gap than most executives assume.",
      },
      {
        type: "h2",
        text: "The pattern among underperformers",
      },
      {
        type: "p",
        text: "The weakest accounts share a habit: they broadcast. Product announcements, corporate milestones, stock photography. The content answers the question 'what do we want to say?' instead of 'what does our audience want to engage with?' — and the engagement rates show it.",
      },
      {
        type: "h2",
        text: "What the winners do differently",
      },
      {
        type: "p",
        text: "The brands that outperform their category — sometimes with a fraction of the follower count — treat social as a conversation surface. They respond fast, they localise their humour, they post people rather than logos, and they publish with a rhythm their audience can feel. Consistency beats intensity in every dataset I have analysed.",
      },
      {
        type: "quote",
        text: "In this market, responsiveness is a competitive advantage that money can't buy and most corporates won't build.",
      },
      {
        type: "h2",
        text: "The opportunity hiding in plain sight",
      },
      {
        type: "p",
        text: "Because so much of the corporate landscape is still broadcasting, the bar for standing out is remarkably low. A brand that commits to genuine engagement — measured properly, reviewed monthly, benchmarked against competitors — can move from mid-table to category leader within a year. I have watched it happen in the data.",
      },
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
