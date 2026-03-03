# Dodo Events

## Visão Geral

Dodo Events é uma aplicação construída com **Next.js (App Router)**, **Prisma ORM** e **PostgreSQL** para gerenciar:

- Eventos
- Participantes (Users)
- Regras de check-in por evento
- Registro de check-ins de usuários

---

## Tecnologias Utilizadas

- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- React Query (TanStack Query)
- Tailwind CSS
- Shadcn/UI
- JWT (Autenticação)

---

## Estrutura do Projeto


/
├── app/
│ ├── api/
│ │ ├── auth/
│ │ ├── events/
│ │ │ ├── route.ts
│ │ │ └── [id]/
│ │ │ └── checkin-rules/route.ts
│ │ └── checkin-rules/
├── lib/
│ ├── prisma.ts
│ └── auth.ts
├── prisma/
│ ├── schema.prisma
│ ├── seed.ts
│ └── migrations/
├── queries/
│ ├── queries/
│ ├── mutations/
├── components/
├── styles/
├── next.config.js
├── package.json
└── tsconfig.json


---

## Banco de Dados (Prisma Schema)

### User

```prisma

#model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  checkins  Checkin[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
Event
model Event {
  id           Int          @id @default(autoincrement())
  name         String
  imageUrl     String?
  placement    String
  startDate    DateTime
  endDate      DateTime
  status       String
  checkins     Checkin[]
  checkinRules CheckinRule[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
CheckinRule
enum CheckinRuleType {
  QR_CODE
  DOCUMENTO
  LISTA_IMPRESSA
  CONFIRMACAO_EMAIL
}

model CheckinRule {
  id          Int               @id @default(autoincrement())
  event       Event             @relation(fields: [eventId], references: [id])
  eventId     Int
  type        CheckinRuleType
  startOffset Int
  endOffset   Int
  mandatory   Boolean
  isActive    Boolean           @default(true)
  checkins    Checkin[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
Checkin
model Checkin {
  id            Int      @id @default(autoincrement())
  user          User     @relation(fields: [userId], references: [id])
  userId        Int
  event         Event    @relation(fields: [eventId], references: [id])
  eventId       Int
  checkinRule   CheckinRule @relation(fields: [checkinRuleId], references: [id])
  checkinRuleId Int
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([userId, eventId])
}
Endpoints da API
Autenticação
Login
POST /api/auth/login

Body:

{
  "email": "user@example.com",
  "password": "senha"
}

Retorna token JWT.

Eventos
Listar todos
GET /api/events

Retorna lista de eventos.

Criar evento
POST /api/events

Body:

{
  "name": "Evento A",
  "placement": "Local X",
  "startDate": "2026-01-01T10:00:00.000Z",
  "endDate": "2026-01-01T18:00:00.000Z",
  "status": "ACTIVE",
  "imageUrl": "https://..."
}
Regras de Check-in por Evento
Listar regras
GET /api/events/{eventId}/checkin-rules

Retorna todas as regras do evento.

Criar regra
POST /api/events/{eventId}/checkin-rules

Body:

{
  "type": "QR_CODE",
  "startOffset": 15,
  "endOffset": 10,
  "mandatory": true,
  "isActive": true
}
Regras Individuais
Buscar regra por id
GET /api/checkin-rules/{id}
Atualizar regra
PUT /api/checkin-rules/{id}

Body:

{ "type": "DOCUMENTO", "isActive": false }
Deletar regra
DELETE /api/checkin-rules/{id}
Queries Frontend (React Query)
useEvents
export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetch("/api/events").then(res => res.json()),
  });
}
useEventCheckinRules
export function useEventCheckinRules(eventId) {
  return useQuery({
    queryKey: ["checkin-rules", eventId],
    queryFn: () => fetch(`/api/events/${eventId}/checkin-rules`).then(res => res.json()),
    enabled: !!eventId,
  });
}
Mutations Frontend (React Query)
Criar regra
export function useCreateCheckinRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }) => fetch(`/api/events/${eventId}/checkin-rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => queryClient.invalidateQueries(["checkin-rules"]),
  });
}
Atualizar regra
export function useUpdateCheckinRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => fetch(`/api/checkin-rules/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    onSuccess: () => queryClient.invalidateQueries(["checkin-rules"]),
  });
}
Deletar regra
export function useDeleteCheckinRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fetch(`/api/checkin-rules/${id}`, { method: "DELETE" }).then(res => res.json()),
    onSuccess: () => queryClient.invalidateQueries(["checkin-rules"]),
  });
}
Fluxos de Uso
Dashboard

Selecionar evento no select

Mostrar status

Exibir cards de detalhes do evento

Exibir regras ativas

Configuração de Check-in

Selecionar evento

Exibir regras

Permitir criar/editar/deletar regras

Exibir resumo dos números calculados

Scripts Úteis
Comando	Descrição
npm install	Instalar dependências
npm run dev	Iniciar servidor de desenvolvimento
npx prisma migrate dev	Criar e aplicar migrations
npx prisma db seed	Popular banco com seed
npx prisma generate	Gerar Prisma Client
Deployment

Configure variáveis de ambiente:

DATABASE_URL

JWT_SECRET

Gere os artefatos antes de deploy:

npx prisma generate

Deploy em Vercel, Railway ou outro host Next.js

Observações Importantes

Autenticação por JWT

Relações entre modelos (Event → CheckinRule)

Prisma retorna tipos tipados para o frontend

React Query para dados e mutations
