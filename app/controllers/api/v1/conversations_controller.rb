# frozen_string_literal: true

class Api::V1::ConversationsController < Api::BaseController
  LIMIT = 20

  before_action -> { doorkeeper_authorize! :read, :'read:statuses' }
  before_action :require_user!

  def index
    render json: paginated_conversations, each_serializer: REST::ConversationSerializer
  end

  private

  def paginated_conversations
    ConversationAccount.where(account: current_account)
                       .paginate_by_id(limit_param(LIMIT), params_slice(:max_id, :since_id, :min_id))
  end
end
