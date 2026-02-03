# 🍽️ LeanBite AI  
### Realistic Meal Planning Under Constraints  
**Abhyudaya Hackathon Submission**

---

## 🔍 Problem Statement

Most meal-planning applications assume **ideal conditions** — full pantries, flexible budgets, and complete nutrition.  
In reality, many people plan meals with:

- Limited food options  
- Tight budgets  
- Incomplete or unbalanced nutrition  

**LeanBite AI** is built for these real-world constraints.

---

## 💡 Solution

LeanBite AI is an AI-powered meal planner that works strictly with **what the user actually has**.

Instead of optimizing for perfection, it focuses on:
- Practical feasibility  
- Honest trade-offs  
- Transparent reasoning  

No calorie chasing. No fake scores. No ideal assumptions.

---

## ⚙️ Features

- Accepts:
  - Available food items
  - Budget
  - Meals per day
  - Diet type
  - Goal
- Generates meal plans using **only listed foods**
- Clearly explains:
  - Nutritional strengths
  - Nutritional weaknesses
  - Trade-offs made under constraints
- Suggests **low-cost substitutions only when critical**

---

## 🧠 Why AI Is Used

This problem requires **reasoning under constraints**, not rule-based matching.

AI helps to:
- Handle incomplete food lists
- Balance nutrition with budget limitations
- Make realistic compromises
- Explain decisions transparently

AI is used for **reasoning and explanation**, not blind automation.

---

## 🧱 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **AI Layer:** Gemini (mocked where API access is restricted)  
- **Design:** Minimal, calm, accessibility-first UI  

---

## 🎯 Design Philosophy

- Honesty over perfection  
- Constraints over optimization  
- Explainability over black-box answers  
- Working MVP over feature overload  

---

## ⚠️ Limitations

- Nutrition analysis is qualitative, not medical advice  
- Output quality depends on input clarity  
- AI API availability may vary  

These limitations are **explicitly acknowledged**.

---

## 🚀 Future Scope

- Consistent structured meal schema
- Local fallback reasoning engine
- Region-aware food cost estimation
- Offline / low-connectivity support

---

## 🔐 Security

- API keys stored in environment variables
- `.env.local` excluded via `.gitignore`
- No user data stored or logged

---

## 🏁 Hackathon Note

LeanBite AI was built as a **focused MVP during the Abhyudaya Hackathon**, prioritizing:

- Clear problem understanding  
- Sensible scope decisions  
- Transparent reasoning  
- A working, demo-ready product  

---
