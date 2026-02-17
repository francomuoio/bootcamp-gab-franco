-- Seed data for public.events
-- Run in Supabase Studio > SQL Editor

create table if not exists public.events (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null,
  event_date timestamptz not null,
  event_end_date timestamptz null,
  location text null,
  city text not null default 'Autre',
  image_url text null,
  registration_url text null,
  replay_url text null,
  is_past boolean not null default false,
  event_type text not null,
  capacity integer null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "Public read published events" on public.events;
create policy "Public read published events"
  on public.events
  for select
  using (published = true);

drop policy if exists "Service role manage events" on public.events;
create policy "Service role manage events"
  on public.events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into public.events (
  id,
  slug,
  title,
  description,
  event_date,
  event_end_date,
  location,
  city,
  image_url,
  registration_url,
  replay_url,
  is_past,
  event_type,
  capacity,
  published
) values
  (
    'event-1',
    'lille-ai-code-meetup-1',
    'GAB Builder Meetup #1',
    'Rejoins la communauté tech lilloise pour le premier meetup français dédié à la pointe de la **Programmation Assistée par IA** : du Vibe Coding aux agents de codage IA comme Windsurf, Cursor ou Cline qui transforment la façon de créer des logiciels.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme notre façon de coder. Que tu sois dev confirmé ou simple curieux, viens découvrir comment créer des applis en discutant simplement avec une IA.

## Au menu :

* Des démos bluffantes de code généré par IA
* Des retours d''expérience de ceux qui l''utilisent déjà
* Des échanges informels sur les possibilités et limites
* Un espace pour tester et expérimenter

## Tu es concerné si :

* Tu codes et tu veux gagner en productivité
* Tu as des idées mais pas les compétences techniques
* Tu es curieux des nouvelles façons de créer du logiciel
* Tu veux rencontrer d''autres passionnés de tech

## Pourquoi venir ?

* Pour voir en direct ce qu''on peut faire avec ces outils
* Pour éviter les galères en apprenant des autres
* Pour élargir ton réseau local de tech enthusiasts
* Pour passer un bon moment autour d''une passion commune

**Ramène ta bonne humeur, tes questions et tes idées ! On se retrouve pour viber ensemble et repousser les limites de la création logicielle !**

_PS: Débutants bienvenus - pas besoin d''être un expert pour participer !_',
    '2024-01-01T19:00:00Z',
    null,
    'Lille, Hauts-de-France',
    'Lille',
    null,
    'https://luma.com/nssmjiml',
    null,
    true,
    'meetup',
    68,
    true
  ),
  (
    'event-2',
    'lille-ai-code-meetup-2',
    'GAB Builder Meetup #2',
    'Rejoins la communauté tech lilloise pour la deuxième édition du meetup dédié à la **programmation assistée par IA** : du Vibe Coding aux agents de codage IA comme Windsurf, Cursor ou Claude Code qui transforment la façon de créer des produits digitaux.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme notre façon de coder. Que tu sois dev confirmé ou simple curieux, viens découvrir comment créer des applis bosstées par de l''IA.

## Au menu :

* Un retour d''expérience de Stéphane Dessein, CTO et Quentin Janon, développeur web chez **Le Fourgon** sur la refonte de leur site web marchand. Ils nous font le plaisir de nous recevoir pour cette seconde édition.

_Mais aussi..._

* Des démos de produits créés avec de l''IA
* Les dernières actus et astuces du moment
* Des échanges informels sur les possibilités et limites

## Tu es concerné si :

* Tu codes et tu veux gagner en productivité
* Tu as des idées mais pas les compétences techniques
* Tu es curieux des nouvelles façons de créer du logiciel
* Tu veux rencontrer d''autres passionnés de tech

## Pourquoi venir ?

* Pour découvrir ce qu''on peut faire avec ces outils
* Pour apprendre des autres membres de la communauté
* Pour élargir ton réseau local de tech enthusiasts
* Pour passer un bon moment autour d''une passion commune

**Ramène ta bonne humeur, tes questions et tes idées ! On se retrouve pour viber ensemble et repousser les limites !**

_PS: Débutants bienvenus - pas besoin d''être un expert pour participer !_',
    '2024-02-01T19:00:00Z',
    null,
    'Le Fourgon, 270 Av. de l''Espace Bâtiment C, 59118 Wambrechies, France',
    'Lille',
    null,
    'https://luma.com/pmlqn16v',
    null,
    true,
    'meetup',
    49,
    true
  ),
  (
    'event-3',
    'lille-ai-code-meetup-3',
    'GAB Builder Meetup #3 – Nouveau format ouvert à tous !',
    'Rejoins la communauté lilloise pour cette **3ᵉ édition** placée sous le signe de l''exploration et du partage entre profils **Tech** et **non-Tech**

Que tu sois **développeur**, **marketeur**, **entrepreneur**, ou simplement **curieux**, viens découvrir comment l''IA transforme la façon de **concevoir des logiciels et des contenus**.

**Au programme (work in progress) :**

* **Pierre-Yves Banaszak et Julien Robidet** du collectif **Hoko** présenteront les dernières nouveautés en matière de développement assisté par IA, ainsi qu''un retour d''expérience terrain.
* **Antoine Crespin** partagera son point de vue de **non-tech** avec un retour d''expérience sur le **Vibe Coding**
* **Quentin Tousart** montrera comment **utiliser Claude Code efficacement sans avoir d''expérience en développement**
* **François Xavier Cao** détaillera la mise en place **d''un** RAG sur mesure pour le traitement de données confidentielles : défis, bonnes pratiques et alternatives

**Et comme toujours…**

On prolonge la soirée autour d''un verre et de quelques snacks offerts par notre sponsor **Proppl** pour **networker, échanger des idées et débattre ensemble des pratiques de demain**.',
    '2024-03-01T19:00:00Z',
    null,
    'SKEMA Business School - Campus Lille, Av. Willy Brandt, 59777 Lille, France',
    'Lille',
    null,
    'https://luma.com/wt1i17z6',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    true,
    'meetup',
    81,
    true
  ),
  (
    'event-4',
    'genai-builders-meetup-4',
    'GenAI Builders meetup #4',
    'Le Lille AI Code Meetup fait peau neuve et devient GAB - GenAI Builders.

L''IA Générative transforme la manière dont nous construisons des produits digitaux. Rejoins la communauté tech lilloise pour la quatrième édition de ce meetup pour partager ou découvrir ces nouveaux usages.

## C''est quoi ce meetup ?

On se retrouve pour échanger, partager des astuces et explorer ensemble comment l''IA transforme radicalement la manière dont nous construisons des produits digitaux.

## Au menu :

* **Le CMS est mort, vive le CMS !**
**Pierre Burgy**, CEO de Strapi, viendra nous expliquer comment l''IA générative rebat les cartes pour les éditeurs de solution de gestion de contenus.
* **Maîtriser l''OCR à l''ère de l''agentic**
Louis Choquel, CTO de Pipelex nous présentera les pièges à éviter dans le domaine de l''extraction de données agentic.
* **Refactoring de code legacy avec l''IA**
**Nicolas Rocq**, TENKAN8 - groupe UMITEK abordera la rétro documentation avec l''IA.',
    '2026-04-01T19:00:00Z',
    null,
    'EuraTechnologies, 165 Av. de Bretagne, 59000 Lille, France',
    'Lille',
    null,
    'https://luma.com/hpup7z3i',
    null,
    false,
    'meetup',
    83,
    true
  ),
  (
    'event-5',
    'paris-genai-workshop-prompt-engineering',
    'Workshop : Prompt Engineering pour Développeurs',
    'Un atelier pratique de 3h pour maîtriser les techniques avancées de prompt engineering.

## Programme

* Les fondamentaux du prompting (chain-of-thought, few-shot, etc.)
* Techniques avancées pour le code generation
* Hands-on : construire un mini-projet avec des prompts optimisés
* Q&A et retours d''expérience

Apportez votre laptop avec un accès à ChatGPT ou Claude !',
    '2025-09-15T14:00:00Z',
    '2025-09-15T17:00:00Z',
    'Station F, 5 Parvis Alan Turing, 75013 Paris',
    'Paris',
    null,
    null,
    'https://www.youtube.com/watch?v=abc123prompt',
    true,
    'workshop',
    30,
    true
  ),
  (
    'event-6',
    'webinar-intro-vibe-coding',
    'Webinar : Introduction au Vibe Coding',
    'Découvre le Vibe Coding en 1h ! Ce webinar en ligne te montre comment construire une application complète simplement en décrivant ce que tu veux à une IA.

## Au programme

* Qu''est-ce que le Vibe Coding ?
* Démo live : créer une app de A à Z
* Outils recommandés (Cursor, Windsurf, Claude Code)
* Tips pour débutants
* Session Q&A',
    '2025-10-22T18:00:00Z',
    '2025-10-22T19:00:00Z',
    null,
    'Remote',
    null,
    null,
    'https://www.youtube.com/watch?v=xyz789vibe',
    true,
    'webinar',
    null,
    true
  ),
  (
    'event-7',
    'lyon-meetup-ai-product',
    'Lyon AI Product Meetup #1',
    'Premier meetup GAB à Lyon ! Rejoins la communauté lyonnaise pour une soirée dédiée à la création de produits digitaux avec l''IA.

## Programme

* Retours d''expérience de startups lyonnaises utilisant l''IA générative
* Démo de prototypage rapide avec des agents IA
* Networking autour d''un apéro

Ouvert à tous les profils : devs, product managers, designers, entrepreneurs.',
    '2025-11-10T19:00:00Z',
    null,
    'H7 Lyon, 70 Quai Perrache, 69002 Lyon',
    'Lyon',
    null,
    null,
    'https://www.youtube.com/watch?v=lyon123meet',
    true,
    'meetup',
    45,
    true
  ),
  (
    'event-8',
    'paris-conference-genai-2025',
    'GenAI Builders Conference Paris 2025',
    'La première conférence GAB à Paris ! Une journée complète de talks, workshops et networking autour de l''IA générative appliquée au développement produit.

## Speakers confirmés

* Keynote d''ouverture sur l''état de l''art de l''IA générative
* 8 talks de 30 min par des experts du domaine
* 2 workshops parallèles l''après-midi
* Table ronde de clôture

## Infos pratiques

* Déjeuner et coffee breaks inclus
* Badges et swag GAB
* Afterwork networking',
    '2025-12-05T09:00:00Z',
    '2025-12-05T18:00:00Z',
    'Le Palace, 8 Rue du Faubourg Montmartre, 75009 Paris',
    'Paris',
    null,
    null,
    null,
    true,
    'conference',
    200,
    true
  ),
  (
    'event-9',
    'webinar-claude-code-deep-dive',
    'Webinar : Claude Code Deep Dive',
    'Un webinar technique pour explorer les capacités avancées de Claude Code.

## Au programme

* Architecture et fonctionnement de Claude Code
* Workflows avancés : hooks, MCP servers, multi-agent
* Démo : refactoring d''un projet legacy complet
* Bonnes pratiques et pièges à éviter
* Q&A avec l''équipe',
    '2026-01-20T12:00:00Z',
    '2026-01-20T13:30:00Z',
    null,
    'Remote',
    null,
    null,
    'https://www.youtube.com/watch?v=claude456deep',
    true,
    'webinar',
    null,
    true
  ),
  (
    'event-10',
    'lille-workshop-nextjs-ai',
    'Workshop : Next.js + AI Stack',
    'Atelier pratique de 2h30 pour apprendre à construire une app Next.js avec des fonctionnalités IA intégrées.

## Ce que tu vas construire

* Une app Next.js 15 avec App Router
* Intégration d''un chatbot IA (Vercel AI SDK)
* Génération de contenu dynamique
* Déploiement sur Vercel

## Prérequis

* Connaissances de base en React/Next.js
* Node.js installé
* Compte Vercel (gratuit)',
    '2026-02-08T14:00:00Z',
    '2026-02-08T16:30:00Z',
    'EuraTechnologies, 165 Av. de Bretagne, 59000 Lille, France',
    'Lille',
    null,
    null,
    'https://www.youtube.com/watch?v=nextai789ws',
    true,
    'workshop',
    25,
    true
  ),
  (
    'event-11',
    'webinar-ai-agents-2026',
    'Webinar : Construire des Agents IA en 2026',
    'Le paysage des agents IA évolue rapidement. Ce webinar fait le point sur les frameworks et patterns qui fonctionnent en 2026.

## Au programme

* État de l''art des frameworks d''agents (LangGraph, CrewAI, Claude Agent SDK)
* Patterns d''architecture multi-agent
* Démo : un agent qui code, teste et déploie
* Retours d''expérience en production',
    '2026-03-10T18:00:00Z',
    '2026-03-10T19:30:00Z',
    null,
    'Remote',
    null,
    'https://luma.com/agents-webinar-2026',
    null,
    false,
    'webinar',
    null,
    true
  ),
  (
    'event-12',
    'paris-meetup-ai-design',
    'Paris AI Design Meetup',
    'Un meetup dédié à l''intersection entre IA et design. Comment les designers utilisent l''IA générative pour accélérer leur workflow.

## Au programme

* IA et UX Research : générer des insights à partir de données qualitatives
* Prototypage rapide avec Figma AI + code IA
* Design systems automatisés
* Networking et échanges

Ouvert à tous : designers, devs front, product managers.',
    '2026-03-20T19:00:00Z',
    null,
    'Le Wagon Paris, 16 Villa Gaudelet, 75011 Paris',
    'Paris',
    null,
    'https://luma.com/paris-ai-design',
    null,
    false,
    'meetup',
    60,
    true
  ),
  (
    'event-13',
    'lyon-workshop-rag-production',
    'Workshop : RAG en Production',
    'Un workshop avancé sur la mise en production de systèmes RAG (Retrieval-Augmented Generation).

## Programme

* Architecture RAG : du prototype à la production
* Chunking strategies et embeddings
* Évaluation et monitoring (RAGAS, LangSmith)
* Hands-on : construire un RAG robuste avec LangChain

## Prérequis

* Python intermédiaire
* Notions de base en LLM
* Laptop avec Python 3.11+',
    '2026-04-15T14:00:00Z',
    '2026-04-15T17:00:00Z',
    'La Cuisine du Web, 23 Rue de la Part-Dieu, 69003 Lyon',
    'Lyon',
    null,
    'https://luma.com/lyon-rag-workshop',
    null,
    false,
    'workshop',
    20,
    true
  ),
  (
    'event-14',
    'conference-genai-france-2026',
    'GenAI Builders Summit France 2026',
    'Le grand rendez-vous annuel de la communauté GAB ! Une conférence nationale réunissant les meilleurs builders IA de France.

## Programme

* 2 tracks parallèles : Tech & Product
* 15+ talks par des speakers internationaux
* Workshops hands-on l''après-midi
* Hackathon de 4h avec des prizes
* Soirée networking

## Speakers

Line-up en cours de finalisation. Stay tuned !',
    '2026-06-12T09:00:00Z',
    '2026-06-12T21:00:00Z',
    'Centre de Congrès de Lille, Grand Palais, 1 Bd des Cités Unies, 59777 Lille',
    'Lille',
    null,
    'https://luma.com/gab-summit-2026',
    null,
    false,
    'conference',
    500,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  event_date = excluded.event_date,
  event_end_date = excluded.event_end_date,
  location = excluded.location,
  city = excluded.city,
  image_url = excluded.image_url,
  registration_url = excluded.registration_url,
  replay_url = excluded.replay_url,
  is_past = excluded.is_past,
  event_type = excluded.event_type,
  capacity = excluded.capacity,
  published = excluded.published,
  updated_at = now()
;
