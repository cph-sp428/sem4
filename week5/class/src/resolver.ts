 resolvers = {
    Mutations : {
        createUser(parent : any, args: any, context: any, info: any) {
            return context.prisma.user.create({
                data: {
                    name: args.name,
                    email: args.email,
                    posts: {
                        create: {
                            title: args.title,
                        },
                    },
                },
            });
        }
    }
}