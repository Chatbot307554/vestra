import type { Review } from '../types';

export const mockReviews: Review[] = [
  { id: 'r001', productId: 'p001', userId: 'u001', userName: 'Emma T.', isVerified: true, rating: 5, title: 'Beautiful quality and fit', body: 'This coat is absolutely stunning in person. The wool is substantial without being heavy, and the camel colour is even richer than in the photos. I received so many compliments. The fit is true to size — I am 5\'8" and the S was perfect with room for a jumper underneath.', fitFeedback: 'true_to_size', helpfulCount: 34, createdAt: '2024-09-18T10:00:00Z', isApproved: true, isReported: false },
  { id: 'r002', productId: 'p001', userId: 'u003', userName: 'Sophie C.', isVerified: true, rating: 4, title: 'Great coat, slightly large', body: 'The quality is excellent and it looks very elegant. I found it ran slightly large in the shoulders so I sized down. Would still highly recommend.', fitFeedback: 'runs_large', helpfulCount: 12, createdAt: '2024-09-10T14:00:00Z', isApproved: true, isReported: false },
  { id: 'r003', productId: 'p003', userId: 'u006', userName: 'Isabella M.', isVerified: true, rating: 5, title: 'Perfect silk dress', body: 'I wore this to a wedding and felt incredible. The silk drapes beautifully and the wrap style is so flattering. The midnight blue is even prettier in person. Worth every penny.', fitFeedback: 'true_to_size', helpfulCount: 45, createdAt: '2024-08-25T09:00:00Z', isApproved: true, isReported: false },
  { id: 'r004', productId: 'p003', userId: 'u001', userName: 'Emma T.', isVerified: true, rating: 5, title: 'My new favourite dress', body: 'This is the kind of dress you can dress up or down. I have worn it with heels to dinner and with trainers for a casual lunch. The silk quality is superb.', fitFeedback: 'true_to_size', helpfulCount: 28, createdAt: '2024-08-20T16:00:00Z', isApproved: true, isReported: false },
  { id: 'r005', productId: 'p002', userId: 'u003', userName: 'Sophie C.', isVerified: true, rating: 4, title: 'Lovely trench, great sale price', body: 'Bought this in the sale and very pleased. The stone colour is versatile and the fit is good. The belt could be a bit sturdier but overall a lovely coat.', fitFeedback: 'true_to_size', helpfulCount: 18, createdAt: '2024-09-12T11:00:00Z', isApproved: true, isReported: false },
  { id: 'r006', productId: 'p004', userId: 'u006', userName: 'Isabella M.', isVerified: true, rating: 4, title: 'Gorgeous detailing', body: 'The broderie anglaise is even more detailed in person. The smocked bodice is very fitted which I liked. Only giving 4 stars because the skirt is quite voluminous.', fitFeedback: 'runs_small', helpfulCount: 9, createdAt: '2024-07-15T13:00:00Z', isApproved: true, isReported: false },
  { id: 'r007', productId: 'p005', userId: 'u001', userName: 'Emma T.', isVerified: true, rating: 5, title: 'Statement piece', body: 'The plissé texture is stunning and catches the light beautifully. The terracotta colour is perfect for autumn. I got the XS and it fit perfectly.', fitFeedback: 'true_to_size', helpfulCount: 22, createdAt: '2024-09-05T10:00:00Z', isApproved: true, isReported: false },
  { id: 'r008', productId: 'p009', userId: 'u003', userName: 'Sophie C.', isVerified: true, rating: 5, title: 'Softest cashmere', body: 'This is the softest cashmere jumper I own. The oat colour goes with everything. I have worn it constantly since it arrived. Excellent quality.', fitFeedback: 'true_to_size', helpfulCount: 31, createdAt: '2024-08-28T15:00:00Z', isApproved: true, isReported: false },
  { id: 'r009', productId: 'p015', userId: 'u002', userName: 'James W.', isVerified: true, rating: 5, title: 'Sharp tailoring', body: 'The cut of this overcoat is impeccable. The charcoal is a great alternative to black and the wool is warm without being bulky. Very impressed with the quality.', fitFeedback: 'true_to_size', helpfulCount: 15, createdAt: '2024-09-22T12:00:00Z', isApproved: true, isReported: false },
  { id: 'r010', productId: 'p018', userId: 'u002', userName: 'James W.', isVerified: true, rating: 4, title: 'Great everyday jumper', body: 'Bought two of these in navy and they are perfect for the office. The merino is good quality and not itchy. Slightly slim fitting so maybe size up if you prefer a relaxed look.', fitFeedback: 'runs_small', helpfulCount: 11, createdAt: '2024-09-26T09:00:00Z', isApproved: true, isReported: false },
];

export function getReviewsByProductId(productId: string): Review[] {
  return mockReviews.filter((r) => r.productId === productId && r.isApproved);
}

export function getRatingDistribution(productId: string): Record<number, number> {
  const reviews = getReviewsByProductId(productId);
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
  return dist;
}
