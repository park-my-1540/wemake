CREATE OR REPLACE VIEW product_list_view AS
SELECT
    product_id,
    name,
    tagline,
    is_promoted,
    promoted_from,
    stats->>'upvotes' as upvotes,
    stats->>'views' as views,
    stats->>'reviews' as reviews,
    (SELECT EXISTS (SELECT 1 FROM public.product_upvotes WHERE product_upvotes.product_id = products.product_id AND product_upvotes.id = auth.uid())) AS is_upvoted,
    created_at,
    stats
FROM products;

select * from product_list_view

-- upvote의 profile id와 productid가 동일하면 is_upvoted true