export interface FollowingShow {
    id?: number;
    user_id: number;
    show_id: number;
};

export const followingShowTable = {
    id: 'tv_follow.id',
    user_id: 'tv_follow.user_id',
    show_id: 'tv_follow.show_id',

    $table: 'tv_follow'
};
