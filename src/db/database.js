import Dexie from 'dexie';

// Create a Dexie database
const db = new Dexie('fitLifeSchedulingDB');

// Define database schema with tables and indexes
db.version(1).stores({
  instructors: '++id, name, email, createdAt',
  schedules: '++id, name, createdAt',
  adminSettings: '++id, updatedAt, adminPassword'
});

// Add timestamps to objects before storing them
const addTimestamps = (obj, isNew = true) => {
  const now = new Date().toISOString();
  return {
    ...obj,
    updatedAt: now,
    ...(isNew ? { createdAt: now } : {})
  };
};

// Instructor operations
export const addInstructor = async (instructorData) => {
  try {
    const dataWithTimestamp = addTimestamps(instructorData);
    const id = await db.instructors.add(dataWithTimestamp);
    return { id, ...dataWithTimestamp };
  } catch (error) {
    console.error("Error adding instructor: ", error);
    throw error;
  }
};

export const getInstructors = async () => {
  try {
    return await db.instructors.orderBy('createdAt').reverse().toArray();
  } catch (error) {
    console.error("Error getting instructors: ", error);
    throw error;
  }
};

export const getInstructorByEmail = async (email) => {
  try {
    const instructor = await db.instructors.where('email').equals(email).first();
    return instructor || null;
  } catch (error) {
    console.error("Error getting instructor by email: ", error);
    throw error;
  }
};

export const updateInstructorAvailability = async (instructorId, availability) => {
  try {
    await db.instructors.update(instructorId, { 
      availability,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating instructor availability: ", error);
    throw error;
  }
};

export const deleteInstructor = async (instructorId) => {
  try {
    await db.instructors.delete(instructorId);
    return true;
  } catch (error) {
    console.error("Error deleting instructor: ", error);
    throw error;
  }
};

// Admin settings operations
export const saveAdminSettings = async (settings) => {
  try {
    // Check if settings exist
    const existingSettings = await db.adminSettings.toArray();
    
    if (existingSettings.length === 0) {
      // Create new settings
      const dataWithTimestamp = addTimestamps(settings);
      const id = await db.adminSettings.add(dataWithTimestamp);
      return { id, ...dataWithTimestamp };
    } else {
      // Update existing settings
      const settingsId = existingSettings[0].id;
      const dataWithTimestamp = addTimestamps(settings, false);
      await db.adminSettings.update(settingsId, dataWithTimestamp);
      return { id: settingsId, ...dataWithTimestamp };
    }
  } catch (error) {
    console.error("Error saving admin settings: ", error);
    throw error;
  }
};

export const getAdminSettings = async () => {
  try {
    const settings = await db.adminSettings.toArray();
    return settings.length > 0 ? settings[0] : null;
  } catch (error) {
    console.error("Error getting admin settings: ", error);
    throw error;
  }
};

// Admin password functions
export const setAdminPassword = async (password) => {
  try {
    // Get current settings or create new ones
    const existingSettings = await getAdminSettings();
    
    if (existingSettings) {
      // Update existing settings with the password
      return await saveAdminSettings({
        ...existingSettings,
        adminPassword: password
      });
    } else {
      // Create new settings with the password
      return await saveAdminSettings({
        adminPassword: password
      });
    }
  } catch (error) {
    console.error("Error setting admin password: ", error);
    throw error;
  }
};

export const verifyAdminPassword = async (password) => {
  try {
    const settings = await getAdminSettings();
    
    // If no settings or no password set, use a default password
    // This is for initial setup only and should be changed by the admin
    if (!settings || !settings.adminPassword) {
      // Default password is fitlife123, but this should be changed immediately
      return password === 'fitlife123';
    }
    
    return password === settings.adminPassword;
  } catch (error) {
    console.error("Error verifying admin password: ", error);
    throw error;
  }
};

// Schedule operations
export const saveSchedule = async (scheduleData) => {
  try {
    const dataWithTimestamp = addTimestamps(scheduleData);
    const id = await db.schedules.add(dataWithTimestamp);
    return { id, ...dataWithTimestamp };
  } catch (error) {
    console.error("Error saving schedule: ", error);
    throw error;
  }
};

export const getSchedules = async () => {
  try {
    return await db.schedules.orderBy('createdAt').reverse().toArray();
  } catch (error) {
    console.error("Error getting schedules: ", error);
    throw error;
  }
};

export default db;