-- Get all available scams for a given site level
WITH level_info AS (
    SELECT ls.category, ls.num_active
    FROM sites s
    JOIN level_scams ls ON s.scam_difficulty = ls.level_id
    WHERE s.site_id = :site_id
)
SELECT 
    s.scam_id,
    s.scam_type,
    s.category,
    s.description,
    li.num_active as available_slots
FROM scams s
JOIN level_info li ON s.category = li.category
WHERE s.min_level <= (SELECT scam_difficulty FROM sites WHERE site_id = :site_id)
ORDER BY s.category, RANDOM();  -- Random ordering within each category
