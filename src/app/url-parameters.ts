import { ParamMap } from '@angular/router';

export function generateUrlParams(item: any): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(item)) {
    params.set(key, String(value));
  }
  return params.toString();
}

export function loadFromUrlParams(this: any, urlParams: ParamMap): void {
  const filter = this;
  Object.keys(this).forEach((key) => {
    const value = urlParams.get(key);

    if (value !== null) {
      // Type handling:
      if (typeof (filter as any)[key] === 'boolean') {
        (filter as any)[key] = value === 'true';
      } else if (typeof (filter as any)[key] === 'number') {
        (filter as any)[key] = Number(value);
      } else {
        (filter as any)[key] = value;
      }
    }
  });
}
