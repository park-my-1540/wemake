CREATE OR REPLACE FUNCTION public.handle_create_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products   
    SET stats = jsonb_set(
        stats,
        '{reviews}',
        to_jsonb(
        COALESCE((stats->>'reviews')::int, 0) + 1
        ),
        true
    ) 
    WHERE product_id = NEW.product_id;
    RETURN NEW; 
END;
$$;

CREATE TRIGGER create_review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.handle_create_review();

CREATE OR REPLACE FUNCTION public.handle_delete_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products   
    SET stats = jsonb_set(
        stats,
        '{reviews}',
        to_jsonb(
        COALESCE((stats->>'reviews')::int, 0) - 1
        ),
        true
    ) 
    WHERE product_id = OLD.product_id;
    RETURN OLD; 
END;
$$;

CREATE TRIGGER delete_review_trigger
AFTER DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.handle_delete_review();