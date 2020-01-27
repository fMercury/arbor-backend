const Sequelize = require('sequelize');
module.exports = function (sequelize) {
    // TABLE 1 of 2: managers
    const manager = sequelize.define('manager',
        {
            address: {
                primaryKey: true,
                type: Sequelize.STRING(42),
            },
            org_id: {
                unique: true,
                type: Sequelize.STRING(42),
            },
            role: {
                type: Sequelize.STRING(5),
            }

        },
        {
            timestamps: true,
        }
    );

    // TABLE 2 of 4: sections
    const section = sequelize.define('section',
        {
            id: {
                primaryKey: true,
                type: Sequelize.STRING(42)
            },
            name: {
                type: Sequelize.STRING(256)
            }

        },
        {
            timestamps: true,
        }
    );
    section.upsert = (values, condition) => (
        section.findOne({ where: condition })
            .then((obj) => {
                if (obj) {
                    return obj.update(values);
                }
                return section.create(values);
            })
    );

    // TABLE 3 of 4: orgids
    const orgid = sequelize.define('orgid',
        {
            orgid: {
                primaryKey: true,
                type: Sequelize.STRING(42)
            },
            environment: {
                type: Sequelize.STRING(42)
            },
            section: {
                type: Sequelize.STRING(42),
                references: {
                    model: 'sections', // name of Target model
                    key: 'id', // key in Target model that we're referencing
                },
                onUpdate: 'CASCADE',
            },
            owner: {
                type: Sequelize.STRING(66),
            },
            associatedKeys: {
                type: Sequelize.TEXT,
                get() {
                    if (this.getDataValue('associatedKeys')) {
                        return JSON.parse(this.getDataValue('associatedKeys'));
                    }
                    return null;
                },
                set(value) {
                    this.setDataValue('associatedKeys', JSON.stringify(value));
                },
            },
            orgJsonHash: {
                type: Sequelize.STRING(66)
            },
            orgJsonUri: {
                type: Sequelize.STRING(1024)
            },
            orgJsonContent: {
                type: Sequelize.BLOB
            },
            dateCreated: {
                type: Sequelize.DATE
            },
            dateUpdated: {
                type: Sequelize.DATE
            },
            lastBlockUpdated: {
                type: Sequelize.INTEGER
            },
            //name: {},
            trust_clues_site_data: {type: Sequelize.STRING(512)}, //TODO make for <types>
            trust_clues_site_valid: {type: Sequelize.BOOLEAN},

        },
        {
            timestamps: true,
        }
    );

    orgid.upsert = (values, condition) => (
        orgid.findOne({ where: condition })
            .then((obj) => {
                if (obj) {
                    return obj.update(values);
                }
                return orgid.create(values);
            })
    );

    // TABLE 4 of 4: stats
    const stats = sequelize.define('stats',
        {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            name: {
                unique: true,
                type: Sequelize.STRING(128)
            },
            value: {
                type: Sequelize.STRING(256)
            }

        },
        {
            timestamps: true,
        }
    );

    return [manager, orgid, stats, section];
};
