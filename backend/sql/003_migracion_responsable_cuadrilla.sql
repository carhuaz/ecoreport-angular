-- ============================================================
-- Migración: Agregar rol ResponsableCuadrilla y responsable_id
-- ============================================================

-- 1. Alterar CHECK constraint de usuarios.rol
ALTER TABLE usuarios DROP CONSTRAINT CK__usuarios__rol__...
ALTER TABLE usuarios ADD CONSTRAINT CK_usuarios_rol CHECK (rol IN ('Ciudadano', 'Validador', 'Administrador', 'ResponsableCuadrilla'));

-- Si no se puede dropear (nombre de constraint desconocido), recrear la tabla:
-- ALTER TABLE usuarios ALTER COLUMN rol NVARCHAR(25) NOT NULL;
-- Luego ejecutar manualmente el CHECK.

-- 2. Agregar columna responsable_id a cuadrillas
ALTER TABLE cuadrillas ADD responsable_id INT NULL REFERENCES usuarios(id);

-- 3. Agregar estado 'En atención' si no existe en reportes (no hay CHECK, es libre)

-- 4. Actualizar cuadrillas existentes (asignar responsables por nombre)
UPDATE cuadrillas SET responsable_id = 7 WHERE id = 1;  -- Carlos López
UPDATE cuadrillas SET responsable_id = 8 WHERE id = 2;  -- Rosa Huamán
UPDATE cuadrillas SET responsable_id = 7 WHERE id = 3;  -- Pedro Sánchez -> Carlos López
UPDATE cuadrillas SET responsable_id = 8 WHERE id = 4;  -- Lucía Torres -> Rosa Huamán
