"""added date column to Day table

Revision ID: d923585f4068
Revises: e1187b0f179d
Create Date: 2023-09-06 12:29:48.699833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd923585f4068'
down_revision = 'e1187b0f179d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('days', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('days', schema=None) as batch_op:
        batch_op.drop_column('date')

    # ### end Alembic commands ###
