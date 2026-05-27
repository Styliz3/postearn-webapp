// src/telegram.ts
export function getTelegramUser() {
  const tg = (window as any).Telegram?.WebApp;

  if (tg) {
    tg.ready();

    const user = tg.initDataUnsafe?.user;

    return {
      id: user?.id || "demo",
      username: user?.username || "demo_user",
      firstName: user?.first_name || "Demo"
    };
  }

  return {
    id: "demo",
    username: "demo_user",
    firstName: "Demo"
  };
}

export function isAdmin(username: string) {
  const demoAdmin = false;
  return username === "sneakyseller" || demoAdmin;
}
