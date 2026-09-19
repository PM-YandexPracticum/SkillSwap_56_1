import type { SkillData } from '@/features/skill-search/data/skills';

/*
 * Ищет навыки по названию (teach) и по желаниям (learn).
 * Поиск регистронезависимый.
 * При пустом запросе возвращает исходный массив.
 */
export const searchSkills = (
  query: string,
  skills: SkillData[]
): SkillData[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return skills;

  return skills.filter((skill) => {
    const teachMatch = skill.teach.teachValue.toLowerCase().includes(trimmed);
    const learnMatch = skill.learn.learnValue.some((item) =>
      item.toLowerCase().includes(trimmed)
    );
    return teachMatch || learnMatch;
  });
};