import { supabase } from '../client.js'

// Get all crewmates ordered by creation date (newest first)
export const getAllCrewmates = async () => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching crewmates:', error)
    throw error
  }
}

// Get a single crewmate by ID
export const getCrewmateById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching crewmate:', error)
    throw error
  }
}

// Create a new crewmate
export const createCrewmate = async (crewmate) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([crewmate])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating crewmate:', error)
    throw error
  }
}

// Update a crewmate
export const updateCrewmate = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('crewmates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating crewmate:', error)
    throw error
  }
}

// Delete a crewmate
export const deleteCrewmate = async (id) => {
  try {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting crewmate:', error)
    throw error
  }
}