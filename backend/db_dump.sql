--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

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
-- Name: admin_maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_maintenance (
    id integer NOT NULL,
    worker_id integer,
    "timestamp" timestamp without time zone,
    updated_timestamp timestamp without time zone,
    location character varying(25),
    station_id integer,
    work_issue text NOT NULL,
    work_duration text NOT NULL,
    work_status text NOT NULL
);


ALTER TABLE public.admin_maintenance OWNER TO postgres;

--
-- Name: admin_maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_maintenance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_maintenance_id_seq OWNER TO postgres;

--
-- Name: admin_maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_maintenance_id_seq OWNED BY public.admin_maintenance.id;


--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    name character varying(30),
    email text NOT NULL,
    password text,
    role character varying(5)
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: infrastructure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.infrastructure (
    id integer NOT NULL,
    location character varying(25),
    problem text,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.infrastructure OWNER TO postgres;

--
-- Name: infrastructure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.infrastructure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.infrastructure_id_seq OWNER TO postgres;

--
-- Name: infrastructure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.infrastructure_id_seq OWNED BY public.infrastructure.id;


--
-- Name: monitoring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monitoring (
    id integer NOT NULL,
    "timestamp" timestamp without time zone,
    station_id integer,
    soil_moisture_percent numeric,
    temperature_c numeric,
    humidity_percent numeric,
    water_level_pressure_cm numeric,
    water_level_ultrasound_cm numeric,
    water_level_average_cm numeric
);


ALTER TABLE public.monitoring OWNER TO postgres;

--
-- Name: monitoring_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monitoring_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.monitoring_id_seq OWNER TO postgres;

--
-- Name: monitoring_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monitoring_id_seq OWNED BY public.monitoring.id;


--
-- Name: municipality; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.municipality (
    id integer NOT NULL,
    municipality_name character varying,
    admins_all integer,
    monitoring_all integer,
    maintenance_work integer
);


ALTER TABLE public.municipality OWNER TO postgres;

--
-- Name: municipality_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.municipality_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.municipality_id_seq OWNER TO postgres;

--
-- Name: municipality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.municipality_id_seq OWNED BY public.municipality.id;


--
-- Name: public_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_info (
    id integer NOT NULL,
    monitoring_public integer,
    user_tips integer,
    infrastructure integer,
    user_observation integer
);


ALTER TABLE public.public_info OWNER TO postgres;

--
-- Name: public_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.public_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.public_info_id_seq OWNER TO postgres;

--
-- Name: public_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.public_info_id_seq OWNED BY public.public_info.id;


--
-- Name: stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stations (
    id integer NOT NULL,
    name character varying(40),
    location character varying(40)
);


ALTER TABLE public.stations OWNER TO postgres;

--
-- Name: stations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stations_id_seq OWNER TO postgres;

--
-- Name: stations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stations_id_seq OWNED BY public.stations.id;


--
-- Name: user_observation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_observation (
    id integer NOT NULL,
    "timestamp" timestamp without time zone,
    location integer,
    warning character varying(50),
    waterlevel numeric,
    risk_assesment character varying(50),
    description text,
    proactive_actions boolean
);


ALTER TABLE public.user_observation OWNER TO postgres;

--
-- Name: user_observation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_observation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_observation_id_seq OWNER TO postgres;

--
-- Name: user_observation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_observation_id_seq OWNED BY public.user_observation.id;


--
-- Name: user_tips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tips (
    id integer NOT NULL,
    "timestamp" timestamp without time zone,
    location character varying,
    description text
);


ALTER TABLE public.user_tips OWNER TO postgres;

--
-- Name: user_tips_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_tips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_tips_id_seq OWNER TO postgres;

--
-- Name: user_tips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_tips_id_seq OWNED BY public.user_tips.id;


--
-- Name: admin_maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_maintenance ALTER COLUMN id SET DEFAULT nextval('public.admin_maintenance_id_seq'::regclass);


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: infrastructure id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infrastructure ALTER COLUMN id SET DEFAULT nextval('public.infrastructure_id_seq'::regclass);


--
-- Name: monitoring id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitoring ALTER COLUMN id SET DEFAULT nextval('public.monitoring_id_seq'::regclass);


--
-- Name: municipality id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipality ALTER COLUMN id SET DEFAULT nextval('public.municipality_id_seq'::regclass);


--
-- Name: public_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info ALTER COLUMN id SET DEFAULT nextval('public.public_info_id_seq'::regclass);


--
-- Name: stations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations ALTER COLUMN id SET DEFAULT nextval('public.stations_id_seq'::regclass);


--
-- Name: user_observation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_observation ALTER COLUMN id SET DEFAULT nextval('public.user_observation_id_seq'::regclass);


--
-- Name: user_tips id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tips ALTER COLUMN id SET DEFAULT nextval('public.user_tips_id_seq'::regclass);


--
-- Data for Name: admin_maintenance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_maintenance (id, worker_id, "timestamp", updated_timestamp, location, station_id, work_issue, work_duration, work_status) FROM stdin;
1	15	2025-05-20 22:01:10	2025-05-20 22:01:10	någonstans	1	för mycke av allt fuktigt	3-5 timmar	kaosartat
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, name, email, password, role) FROM stdin;
15	sami	sami@chasacademmy.se	$2b$10$UiPfSeIYilBlOhvr9uk83eNI1xmI.AXDGtJ2.qkxCjbiAuPmsHy6i	admin
18	albin	albin@chasacademmy.se	$2b$10$6q8zLb3f2L7CTiSmjgY1Bu/VdqhR972KEF09LyBjKwHyoVBa2Noje	admin
\.


--
-- Data for Name: infrastructure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.infrastructure (id, location, problem, "timestamp") FROM stdin;
1	Roxen sjön södra	för mycket vatten överallt, djupt vatten dessutom	2025-05-20 12:33:50
2	Bron vid södra Roxen	Den är översvämmad, välj annan väg	2025-05-20 12:35:10
3	Bolmen sjön södra	Vad gör Roxen vatten i Bolmen?	2025-05-20 12:35:55
4	Södra Roxen	De e fö mö mä van åen	2025-05-23 09:36:28
\.


--
-- Data for Name: monitoring; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monitoring (id, "timestamp", station_id, soil_moisture_percent, temperature_c, humidity_percent, water_level_pressure_cm, water_level_ultrasound_cm, water_level_average_cm) FROM stdin;
2	2025-05-19 11:28:11	1	50	19.9	78	5.5	5.2	5.35
\.


--
-- Data for Name: municipality; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.municipality (id, municipality_name, admins_all, monitoring_all, maintenance_work) FROM stdin;
1	Linköping	\N	\N	\N
\.


--
-- Data for Name: public_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.public_info (id, monitoring_public, user_tips, infrastructure, user_observation) FROM stdin;
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stations (id, name, location) FROM stdin;
1	Södra Roxen	58°2644.9"N 15°3721.3"E
\.


--
-- Data for Name: user_observation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_observation (id, "timestamp", location, warning, waterlevel, risk_assesment, description, proactive_actions) FROM stdin;
\.


--
-- Data for Name: user_tips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tips (id, "timestamp", location, description) FROM stdin;
\.


--
-- Name: admin_maintenance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_maintenance_id_seq', 1, true);


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 18, true);


--
-- Name: infrastructure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.infrastructure_id_seq', 4, true);


--
-- Name: monitoring_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monitoring_id_seq', 2, true);


--
-- Name: municipality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.municipality_id_seq', 1, true);


--
-- Name: public_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_info_id_seq', 1, false);


--
-- Name: stations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stations_id_seq', 1, true);


--
-- Name: user_observation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_observation_id_seq', 1, false);


--
-- Name: user_tips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_tips_id_seq', 1, false);


--
-- Name: admin_maintenance admin_maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_maintenance
    ADD CONSTRAINT admin_maintenance_pkey PRIMARY KEY (id);


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: infrastructure infrastructure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infrastructure
    ADD CONSTRAINT infrastructure_pkey PRIMARY KEY (id);


--
-- Name: monitoring monitoring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitoring
    ADD CONSTRAINT monitoring_pkey PRIMARY KEY (id);


--
-- Name: municipality municipality_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipality
    ADD CONSTRAINT municipality_pkey PRIMARY KEY (id);


--
-- Name: public_info public_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info
    ADD CONSTRAINT public_info_pkey PRIMARY KEY (id);


--
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (id);


--
-- Name: user_observation user_observation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_observation
    ADD CONSTRAINT user_observation_pkey PRIMARY KEY (id);


--
-- Name: user_tips user_tips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tips
    ADD CONSTRAINT user_tips_pkey PRIMARY KEY (id);


--
-- Name: admin_maintenance admin_maintenance_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_maintenance
    ADD CONSTRAINT admin_maintenance_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.stations(id);


--
-- Name: admin_maintenance admin_maintenance_worker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_maintenance
    ADD CONSTRAINT admin_maintenance_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.admins(id);


--
-- Name: monitoring monitoring_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitoring
    ADD CONSTRAINT monitoring_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.stations(id);


--
-- Name: municipality municipality_admins_all_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipality
    ADD CONSTRAINT municipality_admins_all_fkey FOREIGN KEY (admins_all) REFERENCES public.admins(id);


--
-- Name: municipality municipality_maintenance_work_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipality
    ADD CONSTRAINT municipality_maintenance_work_fkey FOREIGN KEY (maintenance_work) REFERENCES public.admin_maintenance(id);


--
-- Name: municipality municipality_monitoring_all_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipality
    ADD CONSTRAINT municipality_monitoring_all_fkey FOREIGN KEY (monitoring_all) REFERENCES public.monitoring(id);


--
-- Name: public_info public_info_infrastructure_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info
    ADD CONSTRAINT public_info_infrastructure_fkey FOREIGN KEY (infrastructure) REFERENCES public.infrastructure(id);


--
-- Name: public_info public_info_monitoring_public_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info
    ADD CONSTRAINT public_info_monitoring_public_fkey FOREIGN KEY (monitoring_public) REFERENCES public.monitoring(id);


--
-- Name: public_info public_info_user_observation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info
    ADD CONSTRAINT public_info_user_observation_fkey FOREIGN KEY (user_observation) REFERENCES public.user_observation(id);


--
-- Name: public_info public_info_user_tips_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_info
    ADD CONSTRAINT public_info_user_tips_fkey FOREIGN KEY (user_tips) REFERENCES public.user_tips(id);


--
-- Name: user_observation user_observation_location_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_observation
    ADD CONSTRAINT user_observation_location_fkey FOREIGN KEY (location) REFERENCES public.monitoring(id);


--
-- PostgreSQL database dump complete
--

