// Дефолтный URL рабочего воркера (используется на клиенте)
const DEFAULT_WORKER_URL = 'https://ultraclining-telegram-api.mike-lee-software-2004.workers.dev';

/**
 * Преобразует file_id медиа в URL для прокси-эндпоинта Cloudflare Worker.
 * Worker будет кэшировать медиа на 1 час.
 *
 * @param fileId - Telegram file_id из media.url или media.thumbnail
 * @returns Полный URL для загрузки медиа через прокси, или undefined если fileId не задан
 */
export function getMediaUrl(fileId: string | undefined): string | undefined {
  if (!fileId) return undefined;

  // На клиенте используем дефолтный URL, на сервере можно переопределить
  const baseUrl = DEFAULT_WORKER_URL;

  return `${baseUrl}/media?file_id=${encodeURIComponent(fileId)}`;
}
