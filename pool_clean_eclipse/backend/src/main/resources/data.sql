MERGE INTO service_offerings (id, title, description, icon, display_order, active) KEY(id) VALUES
(1, 'Pool Design & Architecture', 'Bespoke pool concepts with 3D visualization, landscape planning, lighting, water features, and build-ready layouts.', 'target', 1, true),
(2, 'Pool Construction & Engineering', 'Durable RCC pool construction with waterproofing, plumbing, filtration setup, tiling, and structural precision.', 'grid', 2, true),
(3, 'Maintenance & Water Treatment', 'Routine cleaning, pH balancing, filtration checks, algae treatment, and water quality monitoring.', 'water', 3, true),
(4, 'Renovation & Upgradation', 'Modern resurfacing, LED lighting, pump upgrades, repairs, redesigns, waterfalls, jets, and feature additions.', 'refresh', 4, true),
(5, 'Smart Pool Automation', 'Mobile app controls for lighting, filtration, heating, water features, remote alerts, and energy optimization.', 'wave', 5, true),
(6, 'Equipment Supply & Installation', 'Reliable pumps, filters, underwater lights, heating systems, automation equipment, and maintenance support.', 'gear', 6, true);

MERGE INTO products (id, name, description, starting_price, image_url, icon, display_order, active) KEY(id) VALUES
(1, 'Pool Pumps', 'High efficiency, quiet operation, and long-lasting performance.', 28500.00, NULL, 'pump', 1, true),
(2, 'Filtration Systems', 'Advanced filtration for clear, clean, and healthy pool water.', 45000.00, NULL, 'filter', 2, true),
(3, 'LED Underwater Lights', 'Brilliant illumination with low power consumption and long life.', 7500.00, NULL, 'lights', 3, true),
(4, 'Heating Systems', 'Efficient heating solutions for year-round comfort and energy savings.', 65000.00, NULL, 'heating', 4, true),
(5, 'Smart Automation Controllers', 'Control lighting, filtration, temperature, and more from anywhere.', 32000.00, NULL, 'automation', 5, true),
(6, 'Robotic Pool Cleaners', 'Automatic cleaning with powerful suction and smart navigation.', 85000.00, NULL, 'cleaner', 6, true);
