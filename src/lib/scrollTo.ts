/**
 * Плавный скролл к элементу по id.
 * Если элемент не найден — переходим на главную через router.push,
 * и после загрузки скроллим к нужному разделу через sessionStorage.
 */
export function scrollToSection(
  id: string,
  push?: (path: string) => void,
  pathname?: string,
): void {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  if (push && pathname !== '/') {
    sessionStorage.setItem('scrollTarget', id);
    push('/');
  }
}

/**
 * Вызывается при монтировании главной страницы.
 * Если в sessionStorage есть цель — скроллим к ней.
 */
export function handlePendingScroll(): void {
  const target = sessionStorage.getItem('scrollTarget');
  if (!target) return;
  sessionStorage.removeItem('scrollTarget');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
