import supabase from './supabaseClient'

// Actualiza el progreso de un objetivo de ahorro para el usuario
export async function updateSavingsProgress(userId, goalId, savedAmount) {
  const { data, error } = await supabase
    .from('savings_goals')
    .update({ saved_amount: savedAmount })
    .eq('goal_id', goalId)
    .eq('user_id', userId)
  return { data, error }
}

// Marca un módulo educativo como completado y asigna una medalla
export async function completeEducationModule(userId, moduleId, medal) {
  const { data, error } = await supabase
    .from('educational_progress')
    .upsert({ module_id: moduleId, user_id: userId, completed: true, medal })
  return { data, error }
}

// Obtener hogares favoritos del usuario
export async function getUserHomes(userId) {
  const { data, error } = await supabase
    .from('user_favorites')
    .select('home_id, homes(*)')
    .eq('user_id', userId)
  return { data, error }
}

// Obtener agentes visibles para el usuario (ejemplo: todos los agentes)
export async function getAgentsForUser(userId) {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
  return { data, error }
}

// Guardar favorito de casa para usuario
export async function addFavoriteHome(userId, homeId) {
  const { data, error } = await supabase
    .from('user_favorites')
    .insert({ user_id: userId, home_id: homeId })
  return { data, error }
}

// Crear o actualizar perfil de usuario
export async function createUserProfile(profile) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile, { onConflict: 'user_id' })
  return { data, error }
}

// Crear o actualizar meta de ahorro para el usuario
export async function createSavingsGoal(goal) {
  const { data, error } = await supabase
    .from('savings_goals')
    .upsert(goal, { onConflict: 'goal_id' })
  return { data, error }
}

// Obtener perfil de usuario
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

// Obtener metas de ahorro del usuario
export async function getSavingsGoals(userId) {
  const { data, error } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

// Obtener progreso educativo del usuario
export async function getEducationProgress(userId) {
  const { data, error } = await supabase
    .from('educational_progress')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}
