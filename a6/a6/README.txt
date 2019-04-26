Name: Jvalana Shankar
Unix ID: r4o0b
Student #: 20566155

- Question a : 
main calls rayCast 
rayCast calls nearestT, rayCast2, localShade, bgColor
rayCast2 calls nearestT, localShade, bgColor
localShade calls nearestT
nearestT calls sphere_intersect for each sphere
sphere_intersect returns the t value of the intersection of the sphere and ray

sphere3 is the light

- Question f : added another ray cast function - rayCast3