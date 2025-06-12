# this is the postgres-syntax for the database creation and data modelling

CREATE TABLE "user_observation" (
"id" SERIAL PRIMARY KEY,
"timestamp" VARCHAR(25),
"location" int,
"warning" VARCHAR(50),
"waterlevel" NUMERIC,
"risk_assesment" VARCHAR(50),
"description" TEXT NOT NULL,
"proactive_actions" BOOLEAN
);

CREATE TABLE "monitoring" (
"id" SERIAL PRIMARY KEY,
"timestamp" VARCHAR(25),
"station_id" int,
"soil_moisture_percent" NUMERIC,
"temperature_c" NUMERIC,
"humidity_percent" NUMERIC,
"water_level_pressure_cm" NUMERIC,
"water_level_ultrasound_cm" NUMERIC,
"water_level_average_cm" NUMERIC
);

CREATE TABLE "stations" (
"id" SERIAL PRIMARY KEY,
"name" varchar(40),
"location" varchar(40)
);

CREATE TABLE "public_info" (
"id" SERIAL PRIMARY KEY,
"monitoring_public" int,
"user_tips" int,
"infrastructure" int,
"user_observation" int
);

CREATE TABLE "user_tips" (
"id" SERIAL PRIMARY KEY,
"timestamp" VARCHAR(25),
"location" varchar,
"description" text
);

CREATE TABLE "infrastructure" (
"id" SERIAL PRIMARY KEY,
"location" varchar,
"problem" text,
"timestamp" VARCHAR(25)
);

CREATE TABLE "municipality" (
"id" SERIAL PRIMARY KEY,
"municipality_name" varchar,
"admins_all" int,
"monitoring_all" int,
"maintenance_work" int
);

CREATE TABLE "admins" (
"id" SERIAL PRIMARY KEY,
"name" varchar(30),
"email" varchar(50),
"password" varchar(30),
"role" varchar(5)
);

CREATE TABLE "admin_maintenance" (
"id" SERIAL PRIMARY KEY,
"worker_id" int,
"timestamp" VARCHAR(25),
"updated_timestamp" VARCHAR(25),
"location" varchar(25),
"station_id" int,
"work_issue" TEXT NOT NULL,
"work_duration" TEXT NOT NULL,
"work_status" TEXT NOT NULL
);

ALTER TABLE "user_observation" ADD FOREIGN KEY ("location") REFERENCES "monitoring" ("id");

ALTER TABLE "monitoring" ADD FOREIGN KEY ("station_id") REFERENCES "stations" ("id");

ALTER TABLE "public_info" ADD FOREIGN KEY ("monitoring_public") REFERENCES "monitoring" ("id");

ALTER TABLE "public_info" ADD FOREIGN KEY ("user_tips") REFERENCES "user_tips" ("id");

ALTER TABLE "public_info" ADD FOREIGN KEY ("infrastructure") REFERENCES "infrastructure" ("id");

ALTER TABLE "public_info" ADD FOREIGN KEY ("user_observation") REFERENCES "user_observation" ("id");

ALTER TABLE "municipality" ADD FOREIGN KEY ("admins_all") REFERENCES "admins" ("id");

ALTER TABLE "municipality" ADD FOREIGN KEY ("monitoring_all") REFERENCES "monitoring" ("id");

ALTER TABLE "municipality" ADD FOREIGN KEY ("maintenance_work") REFERENCES "admin_maintenance" ("id");

ALTER TABLE "admin_maintenance" ADD FOREIGN KEY ("worker_id") REFERENCES "admins" ("id");

ALTER TABLE "admin_maintenance" ADD FOREIGN KEY ("station_id") REFERENCES "stations" ("id");
