/**
 * Simple auth module for testing review quality.
 */

export interface User {
  id: string;
  email: string;
  role: "admin" | "user" | "guest";
  lastLogin: Date | null;
}

export function validateToken(token: string): boolean {
  if (!token || token.length < 10) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function hasPermission(user: User, resource: string): boolean {
  if (user.role === "admin") return true;
  if (user.role === "guest") return resource === "public";
  return !resource.startsWith("admin:");
}

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) return null;
  const data = await response.json();
  return {
    id: data.id,
    email: data.email,
    role: data.role,
    lastLogin: data.lastLogin ? new Date(data.lastLogin) : null,
  };
}
