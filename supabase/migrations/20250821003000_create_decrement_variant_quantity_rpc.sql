CREATE OR REPLACE FUNCTION decrement_variant_quantity(variant_id UUID, qty INT)
RETURNS VOID AS $$
BEGIN
  UPDATE product_variants
  SET quantity = quantity - qty
  WHERE id = variant_id;
END;
$$ LANGUAGE plpgsql;
