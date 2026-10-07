-- Estructura de Firestore para MiKasApp (equivalente al esquema SQL de Supabase)
-- Firestore es NoSQL, por lo que usamos colecciones y documentos en lugar de tablas.

-- Colección principal: users
-- Cada documento representa un perfil de usuario (equivalente a 'profiles')
-- ID del documento: user_id (string)
-- Campos:
--   fullName: string
--   email: string (único, pero Firestore no impone unicidad automáticamente)
--   username: string (único)
--   role: string (default 'Clientes')
--   itin: string
--   phone: string
--   createdAt: timestamp
--   updatedAt: timestamp

-- Subcolección bajo users/{userId}/: savingsGoals
-- Cada documento representa una meta de ahorro (equivalente a 'savings_goals')
-- ID del documento: goal_id (string, generado automáticamente)
-- Campos:
--   userId: string (referencia al padre)
--   name: string
--   targetAmount: number
--   savedAmount: number (default 0)

-- Subcolección bajo users/{userId}/: educationalProgress
-- Cada documento representa el progreso educativo (equivalente a 'educational_progress')
-- ID del documento: module_id (string)
-- Campos:
--   userId: string (referencia al padre)
--   completed: boolean (default false)
--   medal: string

-- Subcolección bajo users/{userId}/: documents
-- Cada documento representa un documento subido (equivalente a 'documents')
-- ID del documento: doc_id (string, generado automáticamente)
-- Campos:
--   userId: string (referencia al padre)
--   title: string
--   url: string
--   uploadedAt: timestamp

-- Subcolección bajo users/{userId}/: favorites
-- Cada documento representa un hogar favorito (equivalente a 'user_favorites')
-- ID del documento: home_id (string)
-- Campos:
--   homeId: string (igual al ID del documento)

-- Colección: agents
-- Cada documento representa un agente (equivalente a 'agents')
-- ID del documento: agent_id (string, generado automáticamente)
-- Campos:
--   userId: string (referencia al usuario que lo creó)
--   name: string
--   city: string
--   rating: number

-- Colección: homes
-- Cada documento representa un hogar (equivalente a 'homes')
-- ID del documento: home_id (string, generado automáticamente)
-- Campos:
--   title: string
--   city: string
--   price: number
--   imageUrl: string
--   agentId: string (referencia a agents)

-- Notas:
-- - No hay triggers automáticos; maneja updatedAt en el código cliente.
-- - Para unicidad (email, username), valida en el frontend o usa Firebase Auth.
-- - Usa Firebase Auth para usuarios si es necesario.
-- - Para migrar datos: Exporta de Supabase a JSON/CSV, luego importa a Firestore usando scripts (ej. Node.js con Firebase Admin SDK).