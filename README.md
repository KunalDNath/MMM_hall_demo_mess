# MMM Hall Mess & Grievance Portal

Mobile-first static frontend for GitHub Pages.

## Pages
- `index.html` — home
- `menu.html` — structured August 2026 weekly mess menu with breakfast options and Veg/Non-Veg choices
- `mess-complaint.html` — mess complaint form
- `hall-grievance.html` — hall grievance form
- `track.html` — grievance tracking UI
- `admin.html` — admin dashboard UI demo

## Important
The forms are frontend demos. GitHub Pages cannot securely process/store complaint data by itself.

For production, connect the forms and admin dashboard to Supabase:
- PostgreSQL database
- Supabase Storage for photos
- Row Level Security
- Admin authentication
- Automatic grievance IDs
- 48-hour target timestamps
- Status/update timeline
- Resolution photos

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload all files while preserving the folder structure.
3. Go to Settings → Pages.
4. Choose GitHub Actions or deploy the root branch.
5. Open the generated Pages URL.

The project intentionally uses plain HTML/CSS/JavaScript so it can be deployed directly to GitHub Pages without a build step.
