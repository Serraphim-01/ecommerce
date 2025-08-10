CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB
);

INSERT INTO settings (key, value) VALUES ('siteName', '"ElegantShop"');
INSERT INTO settings (key, value) VALUES ('logo', '{"type": "text", "text": "E", "background": {"type": "gradient", "direction": "br", "colors": ["#4f46e5", "#a855f7"]}}');
