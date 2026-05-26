-- Development admin user seed.
-- Default login:
--   Email/mobile: admin@muscleyn.local or 9999999999
--   Password: admin123
--
-- Change this password before using outside local demos.

SET @now = NOW(6);
SET @admin_password_hash = '$2a$10$b9dcnGp0NR2/qcPL4.u2r.wpFV3P/hFJUlkV6atjS6C3rbCAf2FRi';

INSERT INTO users (
  name,
  mobile_number,
  email,
  password,
  role,
  is_active,
  created_at,
  updated_at
)
VALUES (
  'Muscleyn Admin',
  '9999999999',
  'admin@muscleyn.local',
  @admin_password_hash,
  'ROLE_ADMIN',
  1,
  @now,
  @now
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  email = VALUES(email),
  password = VALUES(password),
  role = 'ROLE_ADMIN',
  is_active = 1,
  updated_at = @now;

SELECT
  'Admin seed completed' AS message,
  id,
  name,
  email,
  mobile_number,
  role
FROM users
WHERE mobile_number = '9999999999';
