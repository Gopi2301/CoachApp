# Technical Architecture
## Coach Infrastructure Platform

---

# 1. Technology Stack

Frontend:
- Next.js (Web-first platform)

Backend:
- NestJS (Modular monolith)

Database:
- Supabase (PostgreSQL)
  - Dev: Self-hosted via Docker
  - Prod: Supabase Cloud
- Prisma ORM

Queue:
- Redis + BullMQ

External Integration:
- Strava API

Deployment:
- Docker
- VPS (8GB RAM initially)
- Nginx reverse proxy

---

# 2. High-Level Architecture

Client (Next.js)
    → NestJS API
        → PostgreSQL

Strava Webhook
    → Controller
        → BullMQ Queue
            → Worker
                → PostgreSQL

Payments Webhook
    → Billing Module
        → Subscription Service
            → Commission Engine

---

# 3. Backend Modules

## Core Modules
- Auth Module (Better-Auth + Prisma Adapter)
- Users Module
- RBAC Module
- Strava Integration Module
- Activities Module
- Splits Module
- PR Engine Module
- Weekly Analytics Module

## Coach Modules
- Coach Profile Module
- Athlete Management Module
- Plan Builder Module
- Messaging Module
- Session Booking Module
- Subscription & Billing Module
- Commission & Payout Module

---

# 4. Database Structure (Core Tables)

## Users
- id
- email
- password_hash
- role (athlete / coach / admin)

## Strava Accounts
- user_id
- access_token (encrypted)
- refresh_token (encrypted)
- expires_at

## Activities
- user_id
- strava_activity_id
- distance
- moving_time
- average_heartrate
- average_cadence
- start_date

## Activity Splits
- activity_id
- split_index
- average_heartrate
- average_speed

## PR Records
- user_id
- activity_id
- milestone_type
- metric_value

---

# 5. Marketplace Tables

## Coach Profiles
- user_id
- bio
- specialization
- pricing_model

## Coach Athletes
- coach_id
- athlete_id
- status
- start_date

## Training Programs
- coach_id
- title
- duration_weeks
- price
- category

## Training Weeks
- program_id
- week_number

## Workouts
- week_id
- workout_type
- target_distance
- target_pace
- notes

## Subscriptions
- athlete_id
- coach_id
- program_id
- status
- renewal_date

## Payments
- subscription_id
- amount
- commission_amount
- payout_status

## Messages
- conversation_id
- sender_id
- message_text
- created_at

---

# 6. Scalability Plan

0–10k users:
- Single VPS
- Modular monolith
- Indexed queries

10k–50k users:
- Read replicas
- DB partitioning by user_id
- Caching dashboard responses

50k+ users:
- Split services (Auth, Activities, Marketplace)
- Dedicated worker nodes
- Observability stack (metrics + logging)

---

# 7. Security Considerations

- Token encryption (Strava)
- Role-based access control
- Data-sharing permissions
- Webhook signature validation
- Idempotent activity ingestion
- Daily backups

---

# 8. Performance Principles

- Precompute weekly aggregates
- Queue all webhook ingestion
- Index on (user_id, start_date)
- Avoid per-second data storage
- Split-level metrics only (1km)

---

# 9. Future Technical Enhancements

- Real-time messaging (WebSockets)
- AI-based performance engine
- Mobile app (React Native)
- Microservice decomposition
- Microservice decomposition
- Event-driven architecture
- **API Documentation**: Swagger / OpenAPI
- **Edge Functions**: Supabase Edge Functions (for specific triggers)
