# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Spendly is a Flask + SQLite personal expense tracker (amounts in rupees, ₹), built as a step-by-step learning project. Much of the app is deliberately unfinished: placeholder routes and stub files are marked with the step that implements them (e.g. "coming in Step 3"). When implementing a step, replace the matching placeholder rather than adding a parallel route.

## Commands

A local virtualenv lives in `venv/`. Each `!` shell command runs in a fresh shell, so `source venv/bin/activate` does not persist — call the venv binaries directly:

```bash
python3 -m venv venv                       # first-time setup
venv/bin/pip install -r requirements.txt   # install deps (flask, werkzeug, pytest, pytest-flask)
venv/bin/python app.py                     # run dev server at http://127.0.0.1:5001 (debug mode)
venv/bin/pytest                            # run tests (no tests/ directory exists yet)
venv/bin/pytest tests/test_x.py::test_name # run a single test
```

There is no linter or build step.

## Architecture

- `app.py` — the single Flask app module; all routes live here. The top section holds implemented page routes (landing, register, login, terms, privacy); the bottom section holds placeholder routes for later steps: logout (Step 3), profile (Step 4), add/edit/delete expense (Steps 7–9).
- `database/db.py` — currently a stub, written in Step 1. It is expected to expose `get_db()` (SQLite connection with `row_factory` set and foreign keys enabled), `init_db()` (`CREATE TABLE IF NOT EXISTS` for all tables), and `seed_db()` (sample dev data). The DB file `expense_tracker.db` is gitignored.
- `templates/` — Jinja2 templates that all extend `base.html` (navbar, footer, `title`/`head`/`content`/`scripts` blocks). Link with `url_for(...)` using the route function names from `app.py`. `login.html` and `register.html` already contain POST forms and an `{% if error %}` block, but their routes only handle GET so far.
- `static/css/style.css` — a single stylesheet driven by CSS custom properties on `:root` (`--ink*`, `--paper*`, `--accent`, `--danger`, `--border`, `--radius-*`, and the `--font-display`/`--font-body` fonts DM Serif Display and DM Sans). Reuse these tokens instead of hard-coding colors or sizes.
- `static/js/main.js` — plain vanilla JS with no framework or bundler. Each feature is an IIFE that bails out early when its elements are absent (see the landing-page video modal, which is wired through `data-video-*` attributes).
