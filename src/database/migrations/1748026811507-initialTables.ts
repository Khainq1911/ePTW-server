import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1748026811507 implements MigrationInterface {
  name = 'InitialTables1748026811507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.attachment_files (
          id serial NOT NULL,
          file_path text NOT NULL,
          permit_id integer NOT NULL,
          created_at timestamp without time zone NOT NULL DEFAULT now(),
          updated_at timestamp without time zone NOT NULL DEFAULT now(),
          delete_at timestamp without time zone,
          file_name character varying NOT NULL,
          bucket character varying NOT NULL,
          CONSTRAINT attachment_files_pkey PRIMARY KEY (id)
        )
      `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.permit_status_histories (
          id serial NOT NULL,
          changed_by integer NOT NULL,
          permit_id integer NOT NULL,
          status character varying NOT NULL DEFAULT 'Pending',
          reason text NOT NULL,
          created_at timestamp without time zone NOT NULL DEFAULT now(),
          CONSTRAINT "PK_7d35494f3001c0cd70db3891c78" PRIMARY KEY (id)
        )
      `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.permits (
          id serial NOT NULL,
          created_at timestamp without time zone NOT NULL DEFAULT now(),
          updated_at timestamp without time zone NOT NULL DEFAULT now(),
          company_name character varying NOT NULL,
          sender_id integer NOT NULL,
          receiver_id integer NOT NULL,
          template_id integer NOT NULL,
          people_number integer NOT NULL,
          work_activities text,
          equipments text,
          location text,
          start_time timestamp without time zone NOT NULL,
          end_time timestamp without time zone NOT NULL,
          status character varying NOT NULL DEFAULT 'Pending',
          data jsonb NOT NULL,
          delete_at timestamp without time zone,
          name character varying NOT NULL,
          CONSTRAINT "PK_e0f39993461b6ea160b4f42ac1c" PRIMARY KEY (id)
        )
      `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.roles (
          id serial NOT NULL,
          name character varying NOT NULL,
          CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id)
        )
      `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.templates (
          id serial NOT NULL,
          created_at timestamp without time zone NOT NULL DEFAULT now(),
          updated_at timestamp without time zone NOT NULL DEFAULT now(),
          name character varying NOT NULL,
          description text NOT NULL,
          img_url character varying,
          is_active boolean NOT NULL DEFAULT true,
          fields jsonb NOT NULL,
          delete_at timestamp without time zone,
          CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY (id)
        )
      `);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public.users (
          id serial NOT NULL,
          created_at timestamp without time zone NOT NULL DEFAULT now(),
          updated_at timestamp without time zone NOT NULL DEFAULT now(),
          name character varying NOT NULL,
          phone character varying NOT NULL,
          email character varying NOT NULL,
          password character varying NOT NULL,
          refresh_token character varying,
          role_id integer NOT NULL DEFAULT 1,
          telegram_id character varying,
          delete_at timestamp without time zone,
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
          CONSTRAINT "UQ_1a1e4649fd31ea6ec6b025c7bfc" UNIQUE (telegram_id),
          CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email),
          CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE (phone)
        )
      `);

    await queryRunner.query(`
        ALTER TABLE IF EXISTS public.permit_status_histories
        ADD CONSTRAINT "FK_9e4c2d5b34685f5ab56ba584c16" FOREIGN KEY (changed_by)
        REFERENCES public.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE IF EXISTS public.permits
        ADD CONSTRAINT "FK_1e44a7f49b9375850d95f26cc19" FOREIGN KEY (receiver_id)
        REFERENCES public.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE IF EXISTS public.permits
        ADD CONSTRAINT "FK_284c61435c759dcec9f646a9053" FOREIGN KEY (template_id)
        REFERENCES public.templates (id) ON UPDATE NO ACTION ON DELETE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE IF EXISTS public.permits
        ADD CONSTRAINT "FK_57c18122067741126ab4eeacca0" FOREIGN KEY (sender_id)
        REFERENCES public.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE IF EXISTS public.users
        ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id)
        REFERENCES public.roles (id) ON UPDATE NO ACTION ON DELETE NO ACTION
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.users DROP CONSTRAINT IF EXISTS "FK_a2cecd1a3531c0b041e29ba46e1"`
    );
    await queryRunner.query(
      `ALTER TABLE public.permits DROP CONSTRAINT IF EXISTS "FK_57c18122067741126ab4eeacca0"`
    );
    await queryRunner.query(
      `ALTER TABLE public.permits DROP CONSTRAINT IF EXISTS "FK_284c61435c759dcec9f646a9053"`
    );
    await queryRunner.query(
      `ALTER TABLE public.permits DROP CONSTRAINT IF EXISTS "FK_1e44a7f49b9375850d95f26cc19"`
    );
    await queryRunner.query(
      `ALTER TABLE public.permit_status_histories DROP CONSTRAINT IF EXISTS "FK_9e4c2d5b34685f5ab56ba584c16"`
    );

    await queryRunner.query(`DROP TABLE IF EXISTS public.attachment_files`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.permit_status_histories`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.permits`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.roles`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.templates`);
    await queryRunner.query(`DROP TABLE IF EXISTS public.users`);
  }
}
