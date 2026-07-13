--
-- PostgreSQL database dump
--

\restrict 3rRKgffvSOG6UKRKPfcezhD2gUmccTJGFcFd74MfLlAzSeyxjAulWcqMmCzxKJk

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-13 12:12:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16898)
-- Name: audit_trail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_trail (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "userId" text NOT NULL,
    action text NOT NULL,
    "entityName" text NOT NULL,
    "entityId" text NOT NULL,
    "oldValues" jsonb,
    "newValues" jsonb,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_trail OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16885)
-- Name: automation_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.automation_logs (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "ruleId" text NOT NULL,
    status text NOT NULL,
    message text,
    "executedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.automation_logs OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16868)
-- Name: automation_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.automation_rules (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    "triggerType" text NOT NULL,
    "actionType" text NOT NULL,
    conditions jsonb,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.automation_rules OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16836)
-- Name: cost_sheet_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cost_sheet_items (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "departureId" text NOT NULL,
    "itemType" text NOT NULL,
    description text NOT NULL,
    amount numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cost_sheet_items OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16818)
-- Name: departure_allocations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departure_allocations (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "departureId" text NOT NULL,
    "supplierId" text NOT NULL,
    "contractId" text NOT NULL,
    "resourceType" text NOT NULL,
    quantity integer NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.departure_allocations OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16729)
-- Name: departure_waitlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departure_waitlist (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "departureId" text NOT NULL,
    "travelerId" text NOT NULL,
    priority integer NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.departure_waitlist OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16708)
-- Name: departures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departures (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "packageId" text NOT NULL,
    name text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    capacity integer NOT NULL,
    "availableCapacity" integer NOT NULL,
    status text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.departures OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16673)
-- Name: itinerary_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itinerary_activities (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "dayId" text NOT NULL,
    title text NOT NULL,
    description text,
    "startTime" timestamp(3) without time zone,
    "endTime" timestamp(3) without time zone,
    location text,
    "supplierId" text,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.itinerary_activities OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16655)
-- Name: itinerary_days; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itinerary_days (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "packageId" text NOT NULL,
    "dayNumber" integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    accommodation text,
    "hotelCheckIn" timestamp(3) without time zone,
    "hotelCheckOut" timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.itinerary_days OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16689)
-- Name: package_pricing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.package_pricing (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "packageId" text NOT NULL,
    "marginPerPax" numeric(65,30) DEFAULT 0 NOT NULL,
    "seasonalAdjustment" numeric(65,30) DEFAULT 0 NOT NULL,
    "addOnsTotal" numeric(65,30) DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.package_pricing OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16801)
-- Name: supplier_contracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier_contracts (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "supplierId" text NOT NULL,
    "contractNumber" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status text NOT NULL,
    terms text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.supplier_contracts OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16783)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    status text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16605)
-- Name: tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenants (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tenants OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16634)
-- Name: tour_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_packages (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    duration integer NOT NULL,
    "basePrice" numeric(65,30) NOT NULL,
    status text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text,
    "updatedBy" text
);


ALTER TABLE public.tour_packages OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16768)
-- Name: traveler_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.traveler_documents (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "travelerId" text NOT NULL,
    "fileName" text NOT NULL,
    "fileUrl" text NOT NULL,
    "documentType" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.traveler_documents OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16745)
-- Name: travelers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.travelers (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "departureId" text,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "passportNumber" text NOT NULL,
    "passportExpiry" timestamp(3) without time zone NOT NULL,
    nationality text NOT NULL,
    "visaStatus" text,
    "complianceStatus" text NOT NULL,
    status text NOT NULL,
    "refundAmount" numeric(65,30),
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.travelers OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16617)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16852)
-- Name: vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vouchers (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "travelerId" text NOT NULL,
    "departureId" text NOT NULL,
    "voucherCode" text NOT NULL,
    status text NOT NULL,
    details text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.vouchers OWNER TO postgres;

--
-- TOC entry 5200 (class 0 OID 16898)
-- Dependencies: 236
-- Data for Name: audit_trail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_trail (id, "tenantId", "userId", action, "entityName", "entityId", "oldValues", "newValues", "timestamp") FROM stdin;
\.


--
-- TOC entry 5199 (class 0 OID 16885)
-- Dependencies: 235
-- Data for Name: automation_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.automation_logs (id, "tenantId", "ruleId", status, message, "executedAt") FROM stdin;
\.


--
-- TOC entry 5198 (class 0 OID 16868)
-- Dependencies: 234
-- Data for Name: automation_rules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.automation_rules (id, "tenantId", name, "triggerType", "actionType", conditions, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5196 (class 0 OID 16836)
-- Dependencies: 232
-- Data for Name: cost_sheet_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cost_sheet_items (id, "tenantId", "departureId", "itemType", description, amount, "createdAt", "updatedAt") FROM stdin;
3bb57509-4fc1-4cdd-9a2e-21b42edc0a5f	default-tenant-uuid	ba124508-c76b-44f2-a0ce-2ce3b699e8d1	SUPPLIER_COST	Airport private transfer	400.000000000000000000000000000000	2026-06-25 11:54:07.897	2026-06-25 11:54:07.897
\.


--
-- TOC entry 5195 (class 0 OID 16818)
-- Dependencies: 231
-- Data for Name: departure_allocations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departure_allocations (id, "tenantId", "departureId", "supplierId", "contractId", "resourceType", quantity, status, "createdAt", "updatedAt") FROM stdin;
8f43a997-1e41-453c-bab9-3c28056b071d	default-tenant-uuid	ba124508-c76b-44f2-a0ce-2ce3b699e8d1	ee7dfd2c-5f11-4785-9feb-7a5b62e4fbb3	620ca20e-3537-4930-bb42-e17e847c818d	TRANSPORT	2	CONFIRMED	2026-06-25 11:54:07.886	2026-06-25 11:54:07.886
\.


--
-- TOC entry 5190 (class 0 OID 16729)
-- Dependencies: 226
-- Data for Name: departure_waitlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departure_waitlist (id, "tenantId", "departureId", "travelerId", priority, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5189 (class 0 OID 16708)
-- Dependencies: 225
-- Data for Name: departures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departures (id, "tenantId", "packageId", name, "startDate", "endDate", capacity, "availableCapacity", status, "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
ba124508-c76b-44f2-a0ce-2ce3b699e8d1	default-tenant-uuid	a40faa7c-66ed-448c-9a26-5ff6a7fa9c20	Parisian Summer Tour - July 2026	2026-07-01 00:00:00	2026-07-08 00:00:00	10	9	ACTIVE	f	\N	2026-06-25 11:54:07.869	2026-06-25 11:54:07.869
\.


--
-- TOC entry 5187 (class 0 OID 16673)
-- Dependencies: 223
-- Data for Name: itinerary_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itinerary_activities (id, "tenantId", "dayId", title, description, "startTime", "endTime", location, "supplierId", "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
14b018f7-c3fc-4069-acb3-b6478da3e3d6	default-tenant-uuid	5770cb21-e151-4b82-ab1a-af3bc5b63e68	Welcome Dinner Banquet	Introduction dinner with group.	2026-07-01 19:00:00	2026-07-01 21:00:00	Hotel Banquet Hall	a5d5860c-9f8d-4f18-81e0-61a13208d35c	f	\N	2026-06-25 11:54:07.856	2026-06-25 11:54:07.856
34e4f759-6707-4286-b7de-a9d89bc22714	default-tenant-uuid	1247c568-918e-42ee-98f7-fe49a9d3f56d	Morning Cruise Seine	Eiffel tower river cruise.	2026-07-02 09:00:00	2026-07-02 11:00:00	Seine Pier 4	ee7dfd2c-5f11-4785-9feb-7a5b62e4fbb3	f	\N	2026-06-25 11:54:07.865	2026-06-25 11:54:07.865
f5b48445-3e62-4165-9b4a-489fc19e22b8	default-tenant-uuid	a84b1849-3020-4b85-a3b8-2167394f8392	Eiffel Tower Tour	Private Tour, Skip-the-line VIP entry.	\N	\N	Tokyo, Japan	\N	f	\N	2026-06-26 13:42:34.361	2026-06-26 13:42:34.361
bc36801b-1084-471b-91bd-6e100f3bb2ff	default-tenant-uuid	d54c0861-f62e-42a1-a822-aff422693248	Louvre Art Guide	Guided tour of masterpieces with curator.	\N	\N	Tokyo, Japan	\N	f	\N	2026-06-26 13:42:34.387	2026-06-26 13:42:34.387
61bb197f-9662-44b5-b7c5-19329575deef	default-tenant-uuid	08aaabac-3509-4b84-a00b-200e7e2ebe47	Seine River Cruise	Dinner Cruise, 3-course gourmet dinner.	\N	\N	Tokyo, Japan	\N	f	\N	2026-06-26 13:42:34.408	2026-06-26 13:42:34.408
2ea82578-0a7c-4445-bd16-3be7b63172c6	default-tenant-uuid	f1120bfb-055f-41e9-a242-452cff265513	Seine River Cruise	Dinner Cruise, 3-course gourmet dinner.	\N	\N	Bali, Indonesia	\N	f	\N	2026-06-26 14:12:02.079	2026-06-26 14:12:02.079
f9e42208-ebfe-4041-80a8-74e765d924ff	default-tenant-uuid	63a89590-1970-4a45-b202-4bda01484fad	Eiffel Tower Tour	Private Tour, Skip-the-line VIP entry.	\N	\N	Bali, Indonesia	\N	f	\N	2026-06-26 14:12:02.104	2026-06-26 14:12:02.104
47d97c59-0abc-41e3-8596-ec2ceee9bd7a	default-tenant-uuid	7520b3a5-0d88-49d7-8637-2587f5767d10	Louvre Art Guide	Guided tour of masterpieces with curator.	\N	\N	Bali, Indonesia	\N	f	\N	2026-06-26 14:12:02.129	2026-06-26 14:12:02.129
381332f1-26ce-45a9-a008-19972641e1e9	default-tenant-uuid	14ddaf26-cdf5-4893-b97f-b2cf0b96855b	Seine River Cruise	Dinner Cruise, 3-course gourmet dinner.	\N	\N	Paris, France	\N	f	\N	2026-06-26 16:10:42.707	2026-06-26 16:10:42.707
0b67856b-b31b-48f7-8bc2-8dfd7421cb54	default-tenant-uuid	0e8cd443-1202-4edf-b68f-b93d15e0281c	Louvre Art Guide	Guided tour of masterpieces with curator.	\N	\N	Paris, France	\N	f	\N	2026-06-26 16:10:42.732	2026-06-26 16:10:42.732
6a73a3fe-4f55-4748-8c0e-9e096725e4dd	default-tenant-uuid	1b27a22a-3459-4c23-b1dd-127c92cbc7ca	Eiffel Tower Tour	Private Tour, Skip-the-line VIP entry.	\N	\N	Paris, France	\N	f	\N	2026-06-26 16:10:42.754	2026-06-26 16:10:42.754
\.


--
-- TOC entry 5186 (class 0 OID 16655)
-- Dependencies: 222
-- Data for Name: itinerary_days; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itinerary_days (id, "tenantId", "packageId", "dayNumber", title, description, accommodation, "hotelCheckIn", "hotelCheckOut", "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
5770cb21-e151-4b82-ab1a-af3bc5b63e68	default-tenant-uuid	a40faa7c-66ed-448c-9a26-5ff6a7fa9c20	1	Arrival & Welcome Dinner	Land in Paris CDG airport. Transfer to Grand Hotel Europe.	Grand Hotel Europe	2026-07-01 14:00:00	2026-07-02 11:00:00	f	\N	2026-06-25 11:54:07.841	2026-06-25 11:54:07.841
1247c568-918e-42ee-98f7-fe49a9d3f56d	default-tenant-uuid	a40faa7c-66ed-448c-9a26-5ff6a7fa9c20	2	Eiffel Tower Tour	Morning tour of Eiffel Tower. Afternoon cruise on the Seine River.	Grand Hotel Europe	\N	\N	f	\N	2026-06-25 11:54:07.851	2026-06-25 11:54:07.851
a84b1849-3020-4b85-a3b8-2167394f8392	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	1	Day 1: Exploring Tokyo, Japan	Bespoke itinerary experience in Tokyo, Japan. Accommodation reserved at Grand Palace Hotel.	Grand Palace Hotel	\N	\N	f	\N	2026-06-26 13:42:34.346	2026-06-26 13:42:34.346
d54c0861-f62e-42a1-a822-aff422693248	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	2	Day 2: Exploring Tokyo, Japan	Bespoke itinerary experience in Tokyo, Japan. Accommodation reserved at Grand Palace Hotel.	Grand Palace Hotel	\N	\N	f	\N	2026-06-26 13:42:34.375	2026-06-26 13:42:34.375
08aaabac-3509-4b84-a00b-200e7e2ebe47	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	3	Day 3: Exploring Tokyo, Japan	Bespoke itinerary experience in Tokyo, Japan. Accommodation reserved at Grand Palace Hotel.	Grand Palace Hotel	\N	\N	f	\N	2026-06-26 13:42:34.397	2026-06-26 13:42:34.397
fdc8c2a4-61fb-4ebe-bd03-c2a6f6932061	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	4	Day 4: Exploring Tokyo, Japan	Bespoke itinerary experience in Tokyo, Japan. Accommodation reserved at Grand Palace Hotel.	Grand Palace Hotel	\N	\N	f	\N	2026-06-26 13:42:34.42	2026-06-26 13:42:34.42
3bb98c55-b54e-4341-8585-04300a272063	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	5	Day 5: Exploring Tokyo, Japan	Bespoke itinerary experience in Tokyo, Japan. Accommodation reserved at Grand Palace Hotel.	Grand Palace Hotel	\N	\N	f	\N	2026-06-26 13:42:34.43	2026-06-26 13:42:34.43
f1120bfb-055f-41e9-a242-452cff265513	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	1	Day 1: Exploring Bali, Indonesia	Bespoke itinerary experience in Bali, Indonesia. Accommodation reserved at Tokyo Park Hyatt.	Tokyo Park Hyatt	\N	\N	f	\N	2026-06-26 14:12:02.067	2026-06-26 14:12:02.067
63a89590-1970-4a45-b202-4bda01484fad	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	2	Day 2: Exploring Bali, Indonesia	Bespoke itinerary experience in Bali, Indonesia. Accommodation reserved at Tokyo Park Hyatt.	Tokyo Park Hyatt	\N	\N	f	\N	2026-06-26 14:12:02.092	2026-06-26 14:12:02.092
7520b3a5-0d88-49d7-8637-2587f5767d10	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	3	Day 3: Exploring Bali, Indonesia	Bespoke itinerary experience in Bali, Indonesia. Accommodation reserved at Tokyo Park Hyatt.	Tokyo Park Hyatt	\N	\N	f	\N	2026-06-26 14:12:02.117	2026-06-26 14:12:02.117
3de70d1e-4fbc-4c31-8adc-6fb146a6a0bc	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	4	Day 4: Exploring Bali, Indonesia	Bespoke itinerary experience in Bali, Indonesia. Accommodation reserved at Tokyo Park Hyatt.	Tokyo Park Hyatt	\N	\N	f	\N	2026-06-26 14:12:02.139	2026-06-26 14:12:02.139
e742319c-7311-404f-9266-94333c14cc77	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	5	Day 5: Exploring Bali, Indonesia	Bespoke itinerary experience in Bali, Indonesia. Accommodation reserved at Tokyo Park Hyatt.	Tokyo Park Hyatt	\N	\N	f	\N	2026-06-26 14:12:02.149	2026-06-26 14:12:02.149
14ddaf26-cdf5-4893-b97f-b2cf0b96855b	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	1	Day 1: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel.	None Selected	\N	\N	f	\N	2026-06-26 16:10:42.692	2026-06-26 16:10:42.692
0e8cd443-1202-4edf-b68f-b93d15e0281c	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	2	Day 2: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel.	None Selected	\N	\N	f	\N	2026-06-26 16:10:42.721	2026-06-26 16:10:42.721
1b27a22a-3459-4c23-b1dd-127c92cbc7ca	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	3	Day 3: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel.	None Selected	\N	\N	f	\N	2026-06-26 16:10:42.742	2026-06-26 16:10:42.742
058d4b9f-c50c-4f41-b1da-cdfbfda29247	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	4	Day 4: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel.	None Selected	\N	\N	f	\N	2026-06-26 16:10:42.766	2026-06-26 16:10:42.766
a126e793-7a2e-48a4-a97b-a61ca10157a7	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	5	Day 5: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel.	None Selected	\N	\N	f	\N	2026-06-26 16:10:42.778	2026-06-26 16:10:42.778
68f4fe2a-520e-43bc-aee9-a4ea75bb9de9	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	1	Day 1: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel. Transport: Range Rover Autobiography. Staff assigned: David Chen (Tour Manager), Sarah Wu (Coordinator), Jordan Smith (Driver).	None Selected	\N	\N	f	\N	2026-06-27 13:55:06.695	2026-06-27 13:55:06.695
33d26d09-d60c-48e5-921b-00d2cc1f3074	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	2	Day 2: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel. Transport: Range Rover Autobiography. Staff assigned: David Chen (Tour Manager), Sarah Wu (Coordinator), Jordan Smith (Driver).	None Selected	\N	\N	f	\N	2026-06-27 13:55:06.708	2026-06-27 13:55:06.708
8555b3ce-9d68-4246-8cce-eb9d48e27bc2	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	3	Day 3: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel. Transport: Range Rover Autobiography. Staff assigned: David Chen (Tour Manager), Sarah Wu (Coordinator), Jordan Smith (Driver).	None Selected	\N	\N	f	\N	2026-06-27 13:55:06.725	2026-06-27 13:55:06.725
3980b97e-bac1-401e-81de-789221099170	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	4	Day 4: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel. Transport: Range Rover Autobiography. Staff assigned: David Chen (Tour Manager), Sarah Wu (Coordinator), Jordan Smith (Driver).	None Selected	\N	\N	f	\N	2026-06-27 13:55:06.736	2026-06-27 13:55:06.736
1a32885a-a12a-4a6b-8742-20c2620c5aa2	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	5	Day 5: Exploring Paris, France	Bespoke itinerary experience in Paris, France. Accommodation reserved at Select Hotel. Transport: Range Rover Autobiography. Staff assigned: David Chen (Tour Manager), Sarah Wu (Coordinator), Jordan Smith (Driver).	None Selected	\N	\N	f	\N	2026-06-27 13:55:06.747	2026-06-27 13:55:06.747
\.


--
-- TOC entry 5188 (class 0 OID 16689)
-- Dependencies: 224
-- Data for Name: package_pricing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.package_pricing (id, "tenantId", "packageId", "marginPerPax", "seasonalAdjustment", "addOnsTotal", "createdAt", "updatedAt") FROM stdin;
2f8a31f6-83e4-43a5-987c-3676d374baa7	default-tenant-uuid	761e2bb2-6324-4e40-bbc1-1a0d8a5649ce	400.000000000000000000000000000000	150.000000000000000000000000000000	100.000000000000000000000000000000	2026-06-25 11:54:07.828	2026-06-25 11:54:07.828
39ea7201-8fc4-42ef-bae9-fe46e938af43	default-tenant-uuid	a40faa7c-66ed-448c-9a26-5ff6a7fa9c20	500.000000000000000000000000000000	200.000000000000000000000000000000	300.000000000000000000000000000000	2026-06-25 11:54:07.836	2026-06-25 11:54:07.836
245bf4bb-f5af-4c67-93f9-9edd69b6b1ab	default-tenant-uuid	55c56f70-56e7-41a5-9efc-96605818f1ba	400.000000000000000000000000000000	150.000000000000000000000000000000	715.000000000000000000000000000000	2026-06-26 13:42:34.303	2026-06-26 13:42:34.325
dff920ae-b9cb-4d8c-bac4-a5bb53ea1fe8	default-tenant-uuid	247b33f8-2ebe-48c5-8597-10e691f70875	400.000000000000000000000000000000	150.000000000000000000000000000000	715.000000000000000000000000000000	2026-06-26 14:12:02.016	2026-06-26 14:12:02.049
26e3d93c-2623-41e7-9d15-4b274332441a	default-tenant-uuid	524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	400.000000000000000000000000000000	150.000000000000000000000000000000	715.000000000000000000000000000000	2026-06-26 16:10:42.647	2026-06-26 16:10:42.666
ab64a659-f7f1-4524-95b6-b70110c2c79b	default-tenant-uuid	cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	400.000000000000000000000000000000	150.000000000000000000000000000000	0.000000000000000000000000000000	2026-06-27 13:55:06.658	2026-06-27 13:55:06.678
\.


--
-- TOC entry 5194 (class 0 OID 16801)
-- Dependencies: 230
-- Data for Name: supplier_contracts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplier_contracts (id, "tenantId", "supplierId", "contractNumber", "startDate", "endDate", status, terms, "createdAt", "updatedAt") FROM stdin;
620ca20e-3537-4930-bb42-e17e847c818d	default-tenant-uuid	ee7dfd2c-5f11-4785-9feb-7a5b62e4fbb3	CON-2026-001	2026-01-01 00:00:00	2028-12-31 00:00:00	ACTIVE	Transport allocations at $200 per vehicle per day.	2026-06-25 11:54:07.805	2026-06-25 11:54:07.805
20d18f4e-9aa1-4924-8f21-8e5f6afe7ef3	default-tenant-uuid	a5d5860c-9f8d-4f18-81e0-61a13208d35c	CON-2026-002	2026-01-01 00:00:00	2028-12-31 00:00:00	ACTIVE	Rooms at $150 per night fixed rate.	2026-06-25 11:54:07.816	2026-06-25 11:54:07.816
4a8823e2-6b98-4d31-a1d0-757c227a70ee	default-tenant-uuid	3ddfa354-65f2-4917-b657-a1f0679ced3f	CON-2026-001	2026-01-01 00:00:00	2028-12-31 00:00:00	ACTIVE	Transport allocations at $200 per vehicle per day.	2026-06-26 15:34:06.29	2026-06-26 15:34:06.29
c66e383d-3822-458a-a15a-0dc8b0316b09	default-tenant-uuid	3b2153a1-049b-4d5c-abd1-efbcc28a9a3f	CON-2026-002	2026-01-01 00:00:00	2028-12-31 00:00:00	ACTIVE	Rooms at $150 per night fixed rate.	2026-06-26 15:34:06.298	2026-06-26 15:34:06.298
\.


--
-- TOC entry 5193 (class 0 OID 16783)
-- Dependencies: 229
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (id, "tenantId", name, email, phone, status, "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
ee7dfd2c-5f11-4785-9feb-7a5b62e4fbb3	default-tenant-uuid	Luxury Transport Services Ltd	ops@luxurytransport.local	+15550199	ACTIVE	f	\N	2026-06-25 11:54:07.795	2026-06-25 11:54:07.795
a5d5860c-9f8d-4f18-81e0-61a13208d35c	default-tenant-uuid	Grand Hotel Europe	booking@grandhoteleurope.local	+15550200	ACTIVE	f	\N	2026-06-25 11:54:07.813	2026-06-25 11:54:07.813
3ddfa354-65f2-4917-b657-a1f0679ced3f	default-tenant-uuid	Luxury Transport Services Ltd	ops@luxurytransport.local	+15550199	ACTIVE	f	\N	2026-06-26 15:34:06.281	2026-06-26 15:34:06.281
3b2153a1-049b-4d5c-abd1-efbcc28a9a3f	default-tenant-uuid	Grand Hotel Europe	booking@grandhoteleurope.local	+15550200	ACTIVE	f	\N	2026-06-26 15:34:06.296	2026-06-26 15:34:06.296
\.


--
-- TOC entry 5183 (class 0 OID 16605)
-- Dependencies: 219
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tenants (id, name, "createdAt", "updatedAt") FROM stdin;
default-tenant-uuid	EventHub360 Corporate Tenant	2026-06-25 11:54:07.601	2026-06-25 11:54:07.601
\.


--
-- TOC entry 5185 (class 0 OID 16634)
-- Dependencies: 221
-- Data for Name: tour_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_packages (id, "tenantId", code, name, description, category, duration, "basePrice", status, "isDeleted", "deletedAt", "createdAt", "updatedAt", "createdBy", "updatedBy") FROM stdin;
761e2bb2-6324-4e40-bbc1-1a0d8a5649ce	default-tenant-uuid	PKG-AMALFI	Amalfi Coast Luxury Getaway	Experience 5 days of absolute bliss along the cliffs of Amalfi.	Luxury Elite	5	2500.000000000000000000000000000000	DRAFT	f	\N	2026-06-25 11:54:07.819	2026-06-25 11:54:07.819	\N	\N
a40faa7c-66ed-448c-9a26-5ff6a7fa9c20	default-tenant-uuid	PKG-PARIS	Parisian Summer Romance	Spend 7 days touring the streets of Paris, climbing the Eiffel Tower, and tasting luxury cuisines.	Romantic Escapes	7	3200.000000000000000000000000000000	PUBLISHED	f	\N	2026-06-25 11:54:07.833	2026-06-25 11:54:07.833	\N	\N
55c56f70-56e7-41a5-9efc-96605818f1ba	default-tenant-uuid	PKG-47L5V	Parisian Summer Dreams	A premium summer experience in the City of Light.	Luxury Elite	5	3240.000000000000000000000000000000	DRAFT	f	\N	2026-06-26 13:42:34.28	2026-06-26 13:42:34.28	8ae04a95-9c4d-48f4-b6cd-239795da6feb	\N
247b33f8-2ebe-48c5-8597-10e691f70875	default-tenant-uuid	PKG-9EGYB	Parisian Summer Dreams	A premium summer experience in the City of Light.	Luxury Elite	5	3240.000000000000000000000000000000	DRAFT	f	\N	2026-06-26 14:12:02.002	2026-06-26 14:12:02.002	8ae04a95-9c4d-48f4-b6cd-239795da6feb	\N
524bf356-b0ef-4aa5-80d2-3d6b3dd0c335	default-tenant-uuid	PKG-QH91H	Parisian Summer Dreams	A premium summer experience in the City of Light.	Luxury Elite	5	3240.000000000000000000000000000000	DRAFT	f	\N	2026-06-26 16:10:42.632	2026-06-26 16:10:42.632	8ae04a95-9c4d-48f4-b6cd-239795da6feb	\N
cb1292d8-a6f7-44eb-a512-c3c5d6ea332c	default-tenant-uuid	PKG-8DUSH	Parisian Summer Dreams	A premium summer experience in the City of Light.	Luxury Elite	5	3240.000000000000000000000000000000	DRAFT	f	\N	2026-06-27 13:55:06.636	2026-06-27 13:55:06.636	8ae04a95-9c4d-48f4-b6cd-239795da6feb	\N
\.


--
-- TOC entry 5192 (class 0 OID 16768)
-- Dependencies: 228
-- Data for Name: traveler_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.traveler_documents (id, "tenantId", "travelerId", "fileName", "fileUrl", "documentType", "createdAt") FROM stdin;
\.


--
-- TOC entry 5191 (class 0 OID 16745)
-- Dependencies: 227
-- Data for Name: travelers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.travelers (id, "tenantId", "departureId", "firstName", "lastName", email, phone, "passportNumber", "passportExpiry", nationality, "visaStatus", "complianceStatus", status, "refundAmount", "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
f1bf8642-e40c-4779-b39c-c4e013316c9a	default-tenant-uuid	ba124508-c76b-44f2-a0ce-2ce3b699e8d1	Alice	Smith	alice@smith.com	+15559090	US-PASS-12345	2031-12-31 00:00:00	US	\N	clear	BOOKED	\N	f	\N	2026-06-25 11:54:07.877	2026-06-25 11:54:07.877
\.


--
-- TOC entry 5184 (class 0 OID 16617)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "tenantId", email, password, role, "isDeleted", "deletedAt", "createdAt", "updatedAt") FROM stdin;
8ae04a95-9c4d-48f4-b6cd-239795da6feb	default-tenant-uuid	manager@eventhub360.com	$2a$10$mcjMGbI.0ieoOkBlEY.5DuQa4GfRuJ3AUgs1hB0tV.bAzG8l.F9iO	tour_manager	f	\N	2026-06-25 11:54:07.779	2026-06-26 15:34:06.27
7bb440ad-b619-4c35-b5b7-2ad4e80bcc98	default-tenant-uuid	ticketing@eventhub360.com	$2a$10$mcjMGbI.0ieoOkBlEY.5DuQa4GfRuJ3AUgs1hB0tV.bAzG8l.F9iO	ticketing_exec	f	\N	2026-06-25 11:54:07.787	2026-06-26 15:34:06.278
87f2472e-be83-4298-bd82-387b2ced7722	default-tenant-uuid	finance@eventhub360.com	$2a$10$mcjMGbI.0ieoOkBlEY.5DuQa4GfRuJ3AUgs1hB0tV.bAzG8l.F9iO	finance_mgr	f	\N	2026-06-25 11:54:07.792	2026-06-26 15:34:06.279
\.


--
-- TOC entry 5197 (class 0 OID 16852)
-- Dependencies: 233
-- Data for Name: vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vouchers (id, "tenantId", "travelerId", "departureId", "voucherCode", status, details, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5010 (class 2606 OID 16912)
-- Name: audit_trail audit_trail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_trail
    ADD CONSTRAINT audit_trail_pkey PRIMARY KEY (id);


--
-- TOC entry 5008 (class 2606 OID 16897)
-- Name: automation_logs automation_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automation_logs
    ADD CONSTRAINT automation_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 5006 (class 2606 OID 16884)
-- Name: automation_rules automation_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automation_rules
    ADD CONSTRAINT automation_rules_pkey PRIMARY KEY (id);


--
-- TOC entry 4999 (class 2606 OID 16851)
-- Name: cost_sheet_items cost_sheet_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_sheet_items
    ADD CONSTRAINT cost_sheet_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4995 (class 2606 OID 16835)
-- Name: departure_allocations departure_allocations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_allocations
    ADD CONSTRAINT departure_allocations_pkey PRIMARY KEY (id);


--
-- TOC entry 4978 (class 2606 OID 16744)
-- Name: departure_waitlist departure_waitlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_waitlist
    ADD CONSTRAINT departure_waitlist_pkey PRIMARY KEY (id);


--
-- TOC entry 4974 (class 2606 OID 16728)
-- Name: departures departures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departures
    ADD CONSTRAINT departures_pkey PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 16688)
-- Name: itinerary_activities itinerary_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT itinerary_activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4965 (class 2606 OID 16672)
-- Name: itinerary_days itinerary_days_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_days
    ADD CONSTRAINT itinerary_days_pkey PRIMARY KEY (id);


--
-- TOC entry 4971 (class 2606 OID 16707)
-- Name: package_pricing package_pricing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.package_pricing
    ADD CONSTRAINT package_pricing_pkey PRIMARY KEY (id);


--
-- TOC entry 4991 (class 2606 OID 16817)
-- Name: supplier_contracts supplier_contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_contracts
    ADD CONSTRAINT supplier_contracts_pkey PRIMARY KEY (id);


--
-- TOC entry 4988 (class 2606 OID 16800)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- TOC entry 4953 (class 2606 OID 16616)
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- TOC entry 4959 (class 2606 OID 16654)
-- Name: tour_packages tour_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_packages
    ADD CONSTRAINT tour_packages_pkey PRIMARY KEY (id);


--
-- TOC entry 4985 (class 2606 OID 16782)
-- Name: traveler_documents traveler_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traveler_documents
    ADD CONSTRAINT traveler_documents_pkey PRIMARY KEY (id);


--
-- TOC entry 4982 (class 2606 OID 16767)
-- Name: travelers travelers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers
    ADD CONSTRAINT travelers_pkey PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 16633)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5002 (class 2606 OID 16867)
-- Name: vouchers vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_pkey PRIMARY KEY (id);


--
-- TOC entry 4997 (class 1259 OID 16932)
-- Name: cost_sheet_items_departureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "cost_sheet_items_departureId_idx" ON public.cost_sheet_items USING btree ("departureId");


--
-- TOC entry 4993 (class 1259 OID 16930)
-- Name: departure_allocations_departureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departure_allocations_departureId_idx" ON public.departure_allocations USING btree ("departureId");


--
-- TOC entry 4996 (class 1259 OID 16931)
-- Name: departure_allocations_supplierId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departure_allocations_supplierId_idx" ON public.departure_allocations USING btree ("supplierId");


--
-- TOC entry 4976 (class 1259 OID 16923)
-- Name: departure_waitlist_departureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departure_waitlist_departureId_idx" ON public.departure_waitlist USING btree ("departureId");


--
-- TOC entry 4979 (class 1259 OID 16924)
-- Name: departure_waitlist_travelerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departure_waitlist_travelerId_idx" ON public.departure_waitlist USING btree ("travelerId");


--
-- TOC entry 4972 (class 1259 OID 16922)
-- Name: departures_packageId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departures_packageId_idx" ON public.departures USING btree ("packageId");


--
-- TOC entry 4975 (class 1259 OID 16921)
-- Name: departures_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departures_tenantId_idx" ON public.departures USING btree ("tenantId");


--
-- TOC entry 4966 (class 1259 OID 16919)
-- Name: itinerary_activities_dayId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "itinerary_activities_dayId_idx" ON public.itinerary_activities USING btree ("dayId");


--
-- TOC entry 4962 (class 1259 OID 16918)
-- Name: itinerary_days_packageId_dayNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "itinerary_days_packageId_dayNumber_key" ON public.itinerary_days USING btree ("packageId", "dayNumber");


--
-- TOC entry 4963 (class 1259 OID 16917)
-- Name: itinerary_days_packageId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "itinerary_days_packageId_idx" ON public.itinerary_days USING btree ("packageId");


--
-- TOC entry 4969 (class 1259 OID 16920)
-- Name: package_pricing_packageId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "package_pricing_packageId_key" ON public.package_pricing USING btree ("packageId");


--
-- TOC entry 4992 (class 1259 OID 16929)
-- Name: supplier_contracts_supplierId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "supplier_contracts_supplierId_idx" ON public.supplier_contracts USING btree ("supplierId");


--
-- TOC entry 4989 (class 1259 OID 16928)
-- Name: suppliers_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "suppliers_tenantId_idx" ON public.suppliers USING btree ("tenantId");


--
-- TOC entry 4957 (class 1259 OID 16914)
-- Name: tour_packages_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tour_packages_code_key ON public.tour_packages USING btree (code);


--
-- TOC entry 4960 (class 1259 OID 16916)
-- Name: tour_packages_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tour_packages_status_idx ON public.tour_packages USING btree (status);


--
-- TOC entry 4961 (class 1259 OID 16915)
-- Name: tour_packages_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "tour_packages_tenantId_idx" ON public.tour_packages USING btree ("tenantId");


--
-- TOC entry 4986 (class 1259 OID 16927)
-- Name: traveler_documents_travelerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "traveler_documents_travelerId_idx" ON public.traveler_documents USING btree ("travelerId");


--
-- TOC entry 4980 (class 1259 OID 16926)
-- Name: travelers_departureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "travelers_departureId_idx" ON public.travelers USING btree ("departureId");


--
-- TOC entry 4983 (class 1259 OID 16925)
-- Name: travelers_tenantId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "travelers_tenantId_idx" ON public.travelers USING btree ("tenantId");


--
-- TOC entry 4954 (class 1259 OID 16913)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 5000 (class 1259 OID 16935)
-- Name: vouchers_departureId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "vouchers_departureId_idx" ON public.vouchers USING btree ("departureId");


--
-- TOC entry 5003 (class 1259 OID 16934)
-- Name: vouchers_travelerId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "vouchers_travelerId_idx" ON public.vouchers USING btree ("travelerId");


--
-- TOC entry 5004 (class 1259 OID 16933)
-- Name: vouchers_voucherCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "vouchers_voucherCode_key" ON public.vouchers USING btree ("voucherCode");


--
-- TOC entry 5035 (class 2606 OID 17056)
-- Name: audit_trail audit_trail_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_trail
    ADD CONSTRAINT "audit_trail_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5034 (class 2606 OID 17051)
-- Name: automation_logs automation_logs_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automation_logs
    ADD CONSTRAINT "automation_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5033 (class 2606 OID 17046)
-- Name: automation_rules automation_rules_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.automation_rules
    ADD CONSTRAINT "automation_rules_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5029 (class 2606 OID 17026)
-- Name: cost_sheet_items cost_sheet_items_departureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_sheet_items
    ADD CONSTRAINT "cost_sheet_items_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES public.departures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5026 (class 2606 OID 17021)
-- Name: departure_allocations departure_allocations_contractId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_allocations
    ADD CONSTRAINT "departure_allocations_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES public.supplier_contracts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5027 (class 2606 OID 17011)
-- Name: departure_allocations departure_allocations_departureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_allocations
    ADD CONSTRAINT "departure_allocations_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES public.departures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5028 (class 2606 OID 17016)
-- Name: departure_allocations departure_allocations_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_allocations
    ADD CONSTRAINT "departure_allocations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5019 (class 2606 OID 16976)
-- Name: departure_waitlist departure_waitlist_departureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_waitlist
    ADD CONSTRAINT "departure_waitlist_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES public.departures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5020 (class 2606 OID 16981)
-- Name: departure_waitlist departure_waitlist_travelerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departure_waitlist
    ADD CONSTRAINT "departure_waitlist_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES public.travelers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5017 (class 2606 OID 16971)
-- Name: departures departures_packageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departures
    ADD CONSTRAINT "departures_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES public.tour_packages(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5018 (class 2606 OID 16966)
-- Name: departures departures_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departures
    ADD CONSTRAINT "departures_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5014 (class 2606 OID 16951)
-- Name: itinerary_activities itinerary_activities_dayId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT "itinerary_activities_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES public.itinerary_days(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5015 (class 2606 OID 16956)
-- Name: itinerary_activities itinerary_activities_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT "itinerary_activities_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5013 (class 2606 OID 16946)
-- Name: itinerary_days itinerary_days_packageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_days
    ADD CONSTRAINT "itinerary_days_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES public.tour_packages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5016 (class 2606 OID 16961)
-- Name: package_pricing package_pricing_packageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.package_pricing
    ADD CONSTRAINT "package_pricing_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES public.tour_packages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5025 (class 2606 OID 17006)
-- Name: supplier_contracts supplier_contracts_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_contracts
    ADD CONSTRAINT "supplier_contracts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5024 (class 2606 OID 17001)
-- Name: suppliers suppliers_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT "suppliers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5012 (class 2606 OID 16941)
-- Name: tour_packages tour_packages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_packages
    ADD CONSTRAINT "tour_packages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5023 (class 2606 OID 16996)
-- Name: traveler_documents traveler_documents_travelerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traveler_documents
    ADD CONSTRAINT "traveler_documents_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES public.travelers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5021 (class 2606 OID 16991)
-- Name: travelers travelers_departureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers
    ADD CONSTRAINT "travelers_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES public.departures(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5022 (class 2606 OID 16986)
-- Name: travelers travelers_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.travelers
    ADD CONSTRAINT "travelers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5011 (class 2606 OID 16936)
-- Name: users users_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5030 (class 2606 OID 17041)
-- Name: vouchers vouchers_departureId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "vouchers_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES public.departures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5031 (class 2606 OID 17031)
-- Name: vouchers vouchers_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "vouchers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public.tenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5032 (class 2606 OID 17036)
-- Name: vouchers vouchers_travelerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "vouchers_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES public.travelers(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-07-13 12:12:10

--
-- PostgreSQL database dump complete
--

\unrestrict 3rRKgffvSOG6UKRKPfcezhD2gUmccTJGFcFd74MfLlAzSeyxjAulWcqMmCzxKJk

